import {createSchema} from '@/graphql'
import {UserResolver} from '@/models/UsersPlayground/user.resolver'
import {genericApolloServer} from '@/graphql/apollo/genericServer'
import {SERVER_URL} from 'config/_consts'
import {log} from '@/utils/libsExport'

export const makeUsersServer = async () => {
	const name = 'users'
	const path = `/${name}`
	const schema = await createSchema([UserResolver], name)
	log.info(SERVER_URL + name)
	return genericApolloServer(schema)
		.getMiddleware(
			{path}
		)
}
