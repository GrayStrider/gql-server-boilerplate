import {AnyObject} from 'tsdef'
import {Context as KoaContext} from 'koa'
import {dataSources} from '@/graphql'


export interface SubscriptionContext {
	connection: AnyObject // TODO types
}

export const context = ({ctx: {session}}: { ctx: KoaContext }) => ({
	session,
})
export type Context = {
	dataSources: ReturnType<typeof dataSources>
} & ReturnType<typeof context>
