import {GraphQLSchema} from 'graphql'
import {Context} from 'koa'
import {ApolloServer} from 'apollo-server-koa'
import {formatError, dataSources} from '@/graphql'
import {APOLLO_ENGINE_API_KEY} from 'config/_consts'

export function genericApolloServer(schema: GraphQLSchema) {
	const context = ({ctx: {session}}: { ctx: Context }) => ({
		session,
	})
	
	return new ApolloServer({
		schema,
		formatError, context, dataSources,
		engine: {apiKey: APOLLO_ENGINE_API_KEY},
		
	})
}
