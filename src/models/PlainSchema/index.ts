import {genericApolloServer} from '@/graphql/apollo/genericServer'
import {plainSchema} from '@/graphql'

export const plainSchemaServer = () => genericApolloServer(plainSchema)
	.getMiddleware(
		{path: '/plain'},
	)
