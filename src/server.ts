import * as Sentry from '@sentry/node'
import {ApolloServer} from 'apollo-server-express'
import connectRedis from 'connect-redis'
import cors from 'cors'
import Express, {ErrorRequestHandler} from 'express'
import session from 'express-session'
import 'reflect-metadata'
import {createConnection} from 'typeorm'
import {dsn, HOST, PORT} from '../config/_consts'
import {ORMConfig} from '../config/_typeorm'
import {DBRequestCounterService} from './__typeorm reference/Middleware/DBRequestCounter'
import {redis} from './redis'
import {formatError} from './utils/apollo, graphql/formatError'
import {createAuthorsLoader} from './utils/dataloader/authorsLoader'
import {errorMiddleware} from './utils/express/errorMiddleware'
import {HttpException} from './utils/express/HttpException'
import {sig} from './utils/log'
import {createSchema} from './utils/type-graphql/createSchema'


export async function main() {
	
	Sentry.init({dsn})
	const app = Express()
	app.use(Sentry.Handlers.requestHandler())
	//================================================================================
	// DB, Redis
	//================================================================================
	sig.await('connecting to db')
	const conn = await createConnection(ORMConfig)
	
	if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
		sig.warn('resetting the DB')
		await conn.synchronize(true)
	}
	
	const RedisStore = connectRedis(session)
	
	//================================================================================
	// Apollo
	//================================================================================
	
	sig.await('generating schema..')
	const schema = await createSchema()
	
	const apolloServer = new ApolloServer({
		schema,
		formatError,
		context        : (ctx: any) => ctx,
		validationRules: [
			// queryComplexity({
			//   // The maximum allowed query complexity, queries above this threshold will be rejected
			//   maximumComplexity: 8,
			//   // The query variables. This is needed because the variables are not available
			//   // in the visitor of the graphql-js library
			//   variables: {},
			//   // Optional callback function to retrieve the determined query complexity
			//   // Will be invoked weather the query is rejected or not
			//   // This can be used for logging or to implement rate limiting
			//   onComplete: (complexity: number) => {
			//     console.log("Query Complexity:", complexity);
			//   },
			//   estimators: [
			//     // Using fieldConfigEstimator is mandatory to make it work with type-graphql
			//     fieldConfigEstimator(),
			//     // This will assign each field a complexity of 1 if no other estimator
			//     // returned a value. We can define the default value for field not explicitly annotated
			//     simpleEstimator({
			//       defaultComplexity: 1
			//     })
			//   ]
			// }) as any
		]
	})
	
	
	//================================================================================
	// Express
	//================================================================================
	
	app.use(
		cors({
			credentials: true,
			// origin     : 'http://localhost:3000'
		})
	)
	
	app.use(
		session({
			store            : new RedisStore({
				client: redis as any
			}),
			name             : 'qid',
			secret           : 'aslkdfjoiq12312',
			resave           : false,
			saveUninitialized: false,
			cookie           : {
				httpOnly: true,
				secure  : process.env.NODE_ENV === 'production',
				maxAge  : 1000 * 60 * 60 * 24 * 7 * 365 // 7 years
			}
		})
	)
	
	
	app.get('*', (req, res, next) => {
		sig.debug(req.session)
		throw new HttpException(404, 'Not found')
	})
	
	app.use(Sentry.Handlers.errorHandler({
		shouldHandleError(error: Error): boolean {
			return true
		}
	}) as ErrorRequestHandler)
	
	app.use(errorMiddleware)
	
	apolloServer.applyMiddleware({app, cors: false})
	
	
	// initial setup logs
	DBRequestCounterService.connect().clearCount()
	
	return app.listen(PORT, () => {
		Sentry.captureMessage('Up')
		sig.success(`server started on http://${HOST}:${PORT}/graphql`)
	})
}
