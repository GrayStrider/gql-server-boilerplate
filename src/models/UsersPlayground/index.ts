import {createSchema} from '@/graphql'
import {UserResolver} from '@/models/UsersPlayground/user.resolver'
import {genericApolloServer} from '@/graphql/apollo/genericServer'
import {SERVER_URL} from 'config/_consts'
import {log} from '@/utils/libsExport'

export const usersServer = async () => {
	const path = '/users'
	const schema = await createSchema([UserResolver])
	log.info(SERVER_URL + path)
	return genericApolloServer(schema)
		.getMiddleware(
			{path},
		)
}
