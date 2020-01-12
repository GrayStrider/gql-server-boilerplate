import 'reflect-metadata'
import Koa, {DefaultState, Context} from 'koa'
import helmet from 'koa-helmet'
import session from 'koa-session'
import cors from '@koa/cors'
import bodyParser from 'koa-bodyparser'
import Router from 'koa-router'
import {log} from '@/utils/libsExport'
import {useContainer, createConnection} from 'typeorm'
import {Container} from 'typedi'
import {ORMConfig} from 'config/_typeorm'
import RedisStore from 'koa-redis'
import {redis} from '@/DB/redis'
import {ApolloServer} from 'apollo-server-koa'
import {createSchema, formatError, dataSources} from '@/graphql'
import {PORT, HOST, APOLLO_ENGINE_API_KEY} from 'config/_consts'

export async function KoaServer() {
	const app = new Koa()
	const router = new Router<DefaultState, Context>()
	
	useContainer(Container)
	const conn = await createConnection(ORMConfig)
	if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
		log.warn('resetting the DB')
		await conn.synchronize(true)
	}
	
	const typegraphqlSchema = await createSchema()
	const context = ({ctx: {session}}: {ctx: Context}) => ({
		session
	})
	const apolloServer = new ApolloServer({
		schema: typegraphqlSchema,
		formatError, context, dataSources,
		engine: {apiKey: APOLLO_ENGINE_API_KEY},
	})
	
	app.use(session({
		store: RedisStore({
			client: redis,
		}),
		key: 'redisCookie',
	}, app))
	
	app.use(helmet({}))
	app.use(cors({}))
	app.use(bodyParser({}))
	
	router.get('/', (ctx, next) => {
		ctx.body = 'Hello World!'
	})
	
	app.use(router.routes())
	app.use(router.allowedMethods({}))
	
	app.use(apolloServer.getMiddleware())
	
	return app
		.listen(PORT, () => {
			log.success(`GraphQL: http://${HOST}:${PORT}${apolloServer.graphqlPath}`)
		})
}

