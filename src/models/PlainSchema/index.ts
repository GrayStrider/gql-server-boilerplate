import {genericApolloServer} from '@/graphql/apollo/genericServer'
import {plainSchema} from '@/graphql'
import {SERVER_URL} from 'config/_consts'
import {log} from '@/utils/libsExport'

export const plainSchemaServer = () => {
	const path = '/plain'
	log.info(SERVER_URL + path)
	return genericApolloServer(plainSchema)
		.getMiddleware(
			{path},
		)
}
