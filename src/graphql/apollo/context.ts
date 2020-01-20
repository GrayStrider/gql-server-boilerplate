import {AnyObject} from 'tsdef'
import {Context as KoaContext} from 'koa'
import {dataSources} from '@/graphql'


export interface SubscriptionContext {
	connection: AnyObject // TODO types
}

export const context = ({ctx: {session, request}}: { ctx: KoaContext }) => ({
	session,
	request,
})
export type Context = {
	dataSources: ReturnType<typeof dataSources>
} & ReturnType<typeof context>
