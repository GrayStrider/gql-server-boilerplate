import {AnyObject} from 'tsdef'
import {Context as KoaContext} from 'koa'
import {dataSources} from '@/graphql'


interface SubscriptionContext {
	connection: AnyObject
}

export default function context ({ctx: {session, request}}: { ctx: KoaContext }) {

	return {
		session,
		request,
	}

}

export type Context = {
	dataSources: ReturnType<typeof dataSources>
} & ReturnType<typeof context>

