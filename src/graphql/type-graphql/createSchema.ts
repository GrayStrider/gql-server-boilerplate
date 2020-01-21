import {ErrorHandler} from '@/utils/typegraphql/middleware/ErrorHandler'
import {buildSchema} from 'type-graphql'
import {Container} from 'typedi'
import {NonEmptyArray} from 'type-graphql/dist/utils/types'
import {pubSub} from '@/graphql/type-graphql/pubSub'
import {authChecker} from '@/graphql/type-graphql/middleware/authChecker'

export type Resolvers = NonEmptyArray<Function> | NonEmptyArray<string>
export const createSchema = (resolvers: Resolvers, schemaNamePrefix: string) =>
	buildSchema({
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
			 * GlobalAuth
			 */
		],
		container: Container,

		resolvers,
		authChecker,
		pubSub,
	})

