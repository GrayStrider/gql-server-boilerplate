import {GraphQLError} from 'graphql'

export function errorFormatter(err: GraphQLError) {
	return {_customField: "Hello", ...err}
}

