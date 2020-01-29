import {genericApolloServer, createSchema} from '@/graphql'
import {signale} from '@/utils'
import {SERVER_URL} from '@config'
import ExampleResolver from '@/models/example/resolvers/ExampleResolver'

export default async function makeExampleServer () {

	const name = 'example'
	const path = `/${name}`
	const schema = await createSchema([ExampleResolver], name)
	signale.info(SERVER_URL + path)
	return genericApolloServer(schema)
		.getMiddleware({path})

}
