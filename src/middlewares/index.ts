import {Middleware} from 'koa'
import {signale} from '@/utils'

const redirect: Middleware = async (ctx, next) => {
	
	await next()
	if (ctx.status === 404) ctx.redirect('/')
	
	
}
const errorHandler: Middleware = async (ctx, next) => {
	
	try {
		
		await next()
		
	}
	catch (err) {
		
		ctx.status = err.status ?? 500
		ctx.body = err.message
		signale.error('Error in Koa handler')
		ctx.app.emit('error', err, ctx)
		
	}
	
}

export {redirect, errorHandler}
