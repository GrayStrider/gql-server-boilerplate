import {Middleware} from 'koa'

export const redirect: Middleware = async (ctx, next) => {
	await next()
	if (ctx.status === 404) {
		ctx.redirect('/')
	}
}
export const errorHandler: Middleware = async (ctx, next) => {
	try {
		await next()
	} catch (err) {
		ctx.status = err.status || 500
		ctx.body = err.message
		ctx.app.emit('error', err, ctx)
	}
}
