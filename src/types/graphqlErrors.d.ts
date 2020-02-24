import graphql from 'graphql'

declare module 'graphql' {
	export interface GraphQLError<T = Error> extends Error {
		readonly originalError: T
		readonly extensions: {
			exception: T
		}
		
	}
}
