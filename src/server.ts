import * as Sentry from '@sentry/node'
import {ApolloServer} from 'apollo-server-express'
import bodyParser from 'body-parser'
import compression from 'compression'
import connectRedis from 'connect-redis'
import cors from 'cors'
import Express from 'express'
import session from 'express-session'
import {mergeSchemas} from 'graphql-tools'
import * as http from 'http'
import lusca from 'lusca'
import 'reflect-metadata'
import {createConnection} from 'typeorm'
import {APOLLO_ENGINE_API_KEY, dsn, HOST, PORT} from '../config/_consts'
import {ORMConfig} from '../config/_typeorm'
import {DBRequestCounterService} from './__typeorm reference/Middleware/DBRequestCounter'
import {context} from './utils/apollo, graphql/context'
import {dataSources} from './datasources'
import {DeprecatedDirective} from './graphql/directives'
import {plainSchema} from './graphql/schemas/plainSchema'
import {redis} from './redis'
import {formatError} from './utils/apollo, graphql/formatError'
import {myErrorMiddleware} from './utils/express/myErrorMiddleware'
import {log} from './utils/log'
import {sentryErrorHandler} from './utils/sentry/errorHandler'
import {createSchema} from './utils/type-graphql/createSchema'


export async function main() {
	// Sentry
	Sentry.init({dsn})
	// Express
	const app = Express()
	// Sentry Handler
	app.use(Sentry.Handlers.requestHandler())
	
	// Create DB connection
	const conn = await createConnection(ORMConfig)
	// Flush if not in production
	if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
		log.warn('resetting the DB')
		await conn.synchronize(true)
	}
	// Redis Store
	const RedisStore = connectRedis(session)
	
	// Initialize Apollo
	const typegraphqlSchema = await createSchema()
	const schema = mergeSchemas({
		schemas: [
			typegraphqlSchema,
			plainSchema,
		],
	})
	
	const apolloServer = new ApolloServer({
		schema, formatError, context,
		validationRules: [],
		engine: {apiKey: APOLLO_ENGINE_API_KEY},
		schemaDirectives: {deprecated: DeprecatedDirective},
		dataSources, subscriptions: {
			onConnect: (connectionParams, websocket, context1) => {
				return {authorised: true}
			},
		},
	})
	
	// Express Middleware
	app.use(cors({
		credentials: true,
		origin: new RegExp(`(http|ws)://${HOST}:${PORT}`),
	}))
	const sessionOptions = {
		store: new RedisStore({
			client: redis as any,
		}),
		name: 'qid',
		secret: 'aslkdfjoiq12312',
		resave: false,
		saveUninitialized: false,
		cookie: {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			maxAge: 1000 * 60 * 60 * 24 * 7 * 365, // 7 years
		},
	}
	app.use(session(sessionOptions))
	app.use(compression())
	app.use(bodyParser.urlencoded({extended: true}))
	app.use(lusca.xframe('SAMEORIGIN'))
	app.use(lusca.xssProtection(true))
	
	app.post('/post', (req, res) => {
		log.debug(req.body)
		res.send('hello post')
	})
	
	// finish apollo setup
	apolloServer.applyMiddleware({app, cors: false})
	
	// error handlers
	app.get('*', (req, res, next) => res.send('Not found'))
	app.use(sentryErrorHandler)
	app.use(myErrorMiddleware)
	
	// flush initial DB setup count
	DBRequestCounterService.connect().clearCount()
	
	// Subscriptions server
	const subscriptionsServer = http.createServer(app)
	apolloServer.installSubscriptionHandlers(subscriptionsServer)
	
	// start
	return subscriptionsServer.listen(PORT, () => {
		Sentry.captureMessage('Up')
		log.success(`server started on http://${HOST}:${PORT}/graphql`)
	})
}

