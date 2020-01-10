import {dataSources} from '@/graphql'
import {Request, Response} from 'express'
import {AnyObject} from 'tsdef'

function isSubscription(ctx: any): ctx is SubscriptionContext {
	return ctx.connection
}

export const context =
	(ctx: Omit<BaseContext, 'dataSources'> | SubscriptionContext) => {
		const shared = {
			token: 'token123',
			username: 'placeholder',
		}
		
		if (isSubscription(ctx)) {
			const {connection} = ctx
			return ({connection, shared})
		}
		return ({
			session: ctx.req.session,
			shared,
		})
		
	}
export const context2 = ({req, res}: {req: Request, res: Response}) => ({
	session: req.session,
	username: 'placeholder'
})

interface BaseContext {
	req: Request,
	res: Response,
	dataSources: ReturnType<typeof dataSources>
	
}

interface SubscriptionContext {
	connection: AnyObject // TODO types
}

export type Context = BaseContext & ReturnType<typeof context2>
