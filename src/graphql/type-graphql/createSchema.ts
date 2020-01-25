import {buildSchema} from 'type-graphql'
import {Container} from 'typedi'
import {NonEmptyArray} from 'type-graphql/dist/utils/types'
import ErrorHandler from '@/graphql/type-graphql/middleware/ErrorHandler'
import pubSub from '@/graphql/type-graphql/pubSub'
import authChecker from '@/graphql/type-graphql/middleware/authChecker'

type Resolvers = NonEmptyArray<Function> | NonEmptyArray<string>

export default async function createSchema (resolvers: Resolvers, schemaNamePrefix: string) {

	return buildSchema({
		// For testing
		emitSchemaFile: {
			path: `./src/graphql/generated/${schemaNamePrefix}.schema.graphql`,
			commentDescriptions: true,
		},
		validate: true,
		// Has access only to "exception" error field, as opposed to apollo-server error formatter
		globalMiddlewares: [
			ErrorHandler,
			
			/*
			 * DbRequestCounter,
			 * globalAuth
			 */
		],
		container: Container,
		
		resolvers,
		authChecker,
		pubSub,
	})

}
