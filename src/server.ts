import * as Sentry from '@sentry/node'
import {ApolloServer} from 'apollo-server-express'
import connectRedis from 'connect-redis'
import cors from 'cors'
import Express, {ErrorRequestHandler} from 'express'
import session from 'express-session'
import 'reflect-metadata'
import {formatArgumentValidationError} from 'type-graphql'
import {createConnection} from 'typeorm'
import {HOST, PORT} from '../config/_consts'
import {ORMConfig} from '../config/_typeorm'
import {redis} from './redis'
import {createAuthorsLoader} from './utils/authorsLoader'
import {createSchema} from './utils/createSchema'



export async function main() {
	Sentry.init({
		dsn: 'https://0590db8cdb3e4b7bacd6c278ca9473a8@sentry.io/1868158',
	});
	const app = Express()
	
	app.use(Sentry.Handlers.requestHandler());
	//================================================================================
	// DB, Redis
	//================================================================================
	const conn = await createConnection(ORMConfig)
	
	// clean up old testing data on startup
	if (process.env.NODE_ENV !== 'production') {
		await conn.synchronize(true)
	}
	
	const RedisStore = connectRedis(session)
	
	//================================================================================
	// Apollo
	//================================================================================
	
	const schema = await createSchema()
	
	const apolloServer = new ApolloServer({
		schema,
		formatError    : formatArgumentValidationError,
		context        : ({req, res}: any) => ({
			req,
			res,
			authorsLoader: createAuthorsLoader()
		}),
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
	
	
	
	apolloServer.applyMiddleware({app, cors: false})
	app.use("/error", (res) => {
		throw new Error("Sentry")
	})
	
	app.use(Sentry.Handlers.errorHandler({
		shouldHandleError(error: Error): boolean {
			return true
		}
	}) as ErrorRequestHandler
	
	);
	
	app.use("/e", (res) => {
		throw new Error("Sentry")
	})
	

	const handler: ErrorRequestHandler = (err, req, res, next) => {
		console.error("Caught error")
		res.status(500).send('Something broke!')
	}
	
	
	app.use(handler)
	
	return app.listen(PORT, () => {
		console.log(`server started on http://${HOST}:${PORT}/graphql`)
	})
}
