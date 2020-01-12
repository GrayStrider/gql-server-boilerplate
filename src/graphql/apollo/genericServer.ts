import {GraphQLSchema} from 'graphql'
import {ApolloServer} from 'apollo-server-koa'
import {formatError, dataSources, context} from '@/graphql'
import {APOLLO_ENGINE_API_KEY} from 'config/_consts'

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

