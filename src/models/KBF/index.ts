import {createSchema} from '@/graphql'
import {log} from '@/utils/libsExport'
import {SERVER_URL} from 'config/_consts'
import {genericApolloServer} from '@/graphql/apollo/genericServer'
import {GetResolver} from '@/models/KBF/resolvers/Get'
import {CreateResolver} from '@/models/KBF/resolvers/Create'

export const makeKBFServer = async () => {
	const name = 'kbf'
	const path = `/${name}`
	const schema = await createSchema([
		GetResolver,
		CreateResolver
	], name)
	log.info(SERVER_URL + path)
	return genericApolloServer(schema)
		.getMiddleware(
			{path},
		)
}
