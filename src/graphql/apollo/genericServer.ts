import {GraphQLSchema} from 'graphql'
import {Context as KoaContext} from 'koa'
import {ApolloServer} from 'apollo-server-koa'
import {formatError, dataSources} from '@/graphql'
import {APOLLO_ENGINE_API_KEY} from 'config/_consts'

const context = ({ctx: {session}}: {ctx: KoaContext}) => ({
	session
})

export function genericApolloServer(schema: GraphQLSchema) {
	return new ApolloServer({
		schema,
		formatError, context, dataSources,
		engine: {apiKey: APOLLO_ENGINE_API_KEY},
		playground: {
			settings: {
				'request.credentials': 'include',
			},
		},
		
	})
}

export type Context = {
	datasources: ReturnType<typeof dataSources>
} & ReturnType<typeof context>
