import graphql from 'graphql'
import Maybe from 'graphql/tsutils/Maybe'


declare module 'graphql' {
	class GraphQLError<T = Error> extends Error {

		constructor(originalError: T)

		readonly originalError: T

		readonly extensions: {
			exception: T
		}

	}
}
