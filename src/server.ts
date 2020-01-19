import 'reflect-metadata'
import Koa from 'koa'
import helmet from 'koa-helmet'
import session from 'koa-session'
import cors from '@koa/cors'
import bodyParser from 'koa-bodyparser'
import {log} from '@/utils/libsExport'
import {useContainer, createConnection} from 'typeorm'
import {Container} from 'typedi'
import {ORMConfig} from 'config/_typeorm'
import RedisStore from 'koa-redis'
import {redisSessionClient} from '@/DB/redis'
import {PORT, HOST} from 'config/_consts'
import {router} from '@/routes'
import {redirect, errorHandler} from '@/utils/koa/middlewares'
import {makeUsersServer} from '@/models/UsersPlayground'
import {makeKBFServer} from '@/models/KBF'


export async function main() {
	const app = new Koa()
	
	app.keys = ['session secret']
	
	useContainer(Container)
	
	const conn = await createConnection(ORMConfig)
	if (process.env.NODE_ENV !== 'production') {
		log.warn('resetting the DB')
		await conn.synchronize(true)
		await redisSessionClient.flushdb()
	}
	
	const usersServer = await makeUsersServer()
	const KBFServer = await makeKBFServer()
	
	app
		.use(errorHandler)
		.use(redirect)
		.use(session({
			store: RedisStore({
				client: redisSessionClient,
			}),
			key: 'redisCookie',
		}, app))
		.on('error', args => {})
		.use(helmet({}))
		.use(cors({}))
		.use(bodyParser({}))
		.use(router.routes())
		.use(router.allowedMethods({}))
		
		.use(usersServer)
		.use(KBFServer)
	
	return app.listen(PORT, () =>
		log.success(`Server started at http://${HOST}:${PORT}`))
}

