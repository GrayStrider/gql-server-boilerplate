import * as Sentry from '@sentry/node'
import {ApolloServer, SchemaDirectiveVisitor} from 'apollo-server-express'
import bodyParser from 'body-parser'
import connectRedis from 'connect-redis'
import cors from 'cors'
import Express, {ErrorRequestHandler} from 'express'
import session from 'express-session'
import {GraphQLEnumValue, GraphQLError, GraphQLField} from 'graphql'
import {mergeSchemas} from 'graphql-tools'
import 'reflect-metadata'
import {createConnection} from 'typeorm'
import {APOLLO_ENGINE_API_KEY, dsn, HOST, PORT} from '../config/_consts'
import {ORMConfig} from '../config/_typeorm'
import {DBRequestCounterService} from './__typeorm reference/Middleware/DBRequestCounter'
import {context} from './context'
import {dataSources} from './datasources'
import {plainSchema} from './plainSchema'
import {redis} from './redis'
import {formatError} from './utils/apollo, graphql/formatError'
import {errorMiddleware} from './utils/express/errorMiddleware'
import {log} from './utils/log'
import {createSchema} from './utils/type-graphql/createSchema'
import lusca from 'lusca'
import compression from 'compression'


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
	
	// Connect to Redis
	const RedisStore = connectRedis(session)
	
	//================================================================================
	// Apollo
	//================================================================================
	
	// Initialize Apollo
	const typegraphqlSchema = await createSchema()
	const schema = mergeSchemas({
		schemas: [
			typegraphqlSchema,
			plainSchema,
		],
	})
	
	const apolloServer = new ApolloServer({
		schema,
		formatError,
		context,
		validationRules : [],
		engine          : {
			apiKey: APOLLO_ENGINE_API_KEY
		},
		schemaDirectives: {
			deprecated: DeprecatedDirective,
		},
		dataSources,
		
	})
	
	// Express Middleware
	app.use(
		cors({
			credentials: true,
			/* origin     : 'http://localhost:3000'*/
		}))
	app.use(
		session({
			store            : new RedisStore({
				client: redis as any,
			}),
			name             : 'qid',
			secret           : 'aslkdfjoiq12312',
			resave           : false,
			saveUninitialized: false,
			cookie           : {
				httpOnly: true,
				secure  : process.env.NODE_ENV === 'production',
				maxAge  : 1000 * 60 * 60 * 24 * 7 * 365, // 7 years
			},
		}),
	)
	app.use(compression())
	app.use(bodyParser.urlencoded({ extended: true }))
	// app.use(bodyParser.json())
	app.use(lusca.xframe('SAMEORIGIN'))
	app.use(lusca.xssProtection(true))
	
	// Add middleware to Apollo
	apolloServer.applyMiddleware({app, cors: false})
	
	// Fallback
	app.get('*', (req, res) => res.send('Not found'))
	
	
	// POST example
	app.post('/post', (req, res, next) => {
		req.body
		res
		res.send("hello post")
	})
	
	// Sentry error handler
	app.use(Sentry.Handlers.errorHandler({
		shouldHandleError(error: Error): boolean {
			return true
		},
	}) as ErrorRequestHandler)
	
	// my error handler
	app.use(errorMiddleware)
	
	
	// flush initial DB setup count
	DBRequestCounterService.connect().clearCount()
	
	return app.listen(PORT, () => {
		Sentry.captureMessage('Up')
		log.success(`server started on http://${HOST}:${PORT}/graphql`)
	})
}

class DeprecatedDirective extends SchemaDirectiveVisitor {
	public visitFieldDefinition(field: GraphQLField<any, any>) {
		field.isDeprecated = true
		field.deprecationReason = this.args.reason
	}
	
	public visitEnumValue(value: GraphQLEnumValue) {
		value.isDeprecated = true
		value.deprecationReason = this.args.reason
	}
}

