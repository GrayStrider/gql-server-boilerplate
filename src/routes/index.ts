import Router from 'koa-router'
import {DefaultState, Context} from 'koa'

const router = new Router<DefaultState, Context>()

router.get('/', (ctx, next) => {
	ctx.body = 'Hello World!'
	
})

export {router}
