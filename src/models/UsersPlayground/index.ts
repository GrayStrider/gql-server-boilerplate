import {createSchema} from '@/graphql'
import {UserResolver} from '@/models/UsersPlayground/user.resolver'
import {genericApolloServer} from '@/graphql/apollo/genericServer'

export const usersServer = async () => {
	const schema = await createSchema([UserResolver])
	return genericApolloServer(schema)
		.getMiddleware(
			{path: '/users'},
		)
}
