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
import {redis} from '@/DB/redis'
import {PORT, HOST} from 'config/_consts'
import {usersServer} from '@/models/UsersPlayground'
import {plainSchemaServer} from '@/models/PlainSchema'
import {router} from '@/routes'

export async function main() {
	const app = new Koa()
	
	useContainer(Container)
	
	const conn = await createConnection(ORMConfig)
	if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
		log.warn('resetting the DB')
		await conn.synchronize(true)
	}
	
	app.keys = ['session secret']
	
	
	app
		.use(errorHandler)
		.use(redirect)
		.use(session({
			store: RedisStore({
				client: redis,
			}),
			key: 'redisCookie',
		}, app))
		
		.on('error', (err, ctx) => {
			/* centralized error handling:
			 *   console.log error
			 *   write error to log file
			 *   save error and request information to database if ctx.request match condition
			 *   ...
			 */
		})
		.use(helmet({}))
		.use(cors({}))
		.use(bodyParser({}))
		.use(await usersServer())
		.use(plainSchemaServer())
		.use(router.routes())
		.use(router.allowedMethods({}))
		.use(await usersServer())
		.use(plainSchemaServer())
	
	
	return app.listen(PORT, () =>
		log.success(`Server started at http://${HOST}:${PORT}`))
}

