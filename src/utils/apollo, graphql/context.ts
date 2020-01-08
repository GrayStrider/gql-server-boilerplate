import {Request, Response} from 'express'
import {AnyObject} from 'tsdef'
import {dataSources} from '../../datasources'

function isSubscription(ctx: any): ctx is SubscriptionContext {
	return ctx.connection
}

export const context =
	(ctx: Omit<BaseContext, 'dataSources'> | SubscriptionContext) => {
		const shared = {token: 'token123'}
		
		if (!isSubscription(ctx)) return ({
			session: ctx.req.session,
			shared
		})
		const {connection} = ctx
		return ({connection, shared})
		
	}

interface BaseContext {
	req: Request,
	res: Response,
	dataSources: ReturnType<typeof dataSources>
	
}

interface SubscriptionContext {
	connection: AnyObject // TODO types
}

export type Context = BaseContext & ReturnType<typeof context>
