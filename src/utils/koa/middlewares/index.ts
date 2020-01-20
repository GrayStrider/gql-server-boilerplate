import {Middleware} from 'koa'
import {log} from '@/utils/libsExport'

export const redirect: Middleware = async (ctx, next) => {

	await next()
	if (ctx.status === 404) ctx.redirect('/')


}
export const errorHandler: Middleware = async (ctx, next) => {

	try {

		await next()

	} catch (err) {

		ctx.status = err.status || 500
		ctx.body = err.message
		log.error('Error in Koa handler')
		ctx.app.emit(
			'error', err, ctx
		)

	}

}
