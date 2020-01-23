import {AnyObject} from 'tsdef'
import {Context as KoaContext} from 'koa'
import {dataSources} from '@/graphql'


interface SubscriptionContext {
	connection: AnyObject
}

const context = ({ctx: {session, request}}: { ctx: KoaContext }) => ({
	session,
	request,
})

type Context = {
	dataSources: ReturnType<typeof dataSources>
} & ReturnType<typeof context>

export {Context, context}
