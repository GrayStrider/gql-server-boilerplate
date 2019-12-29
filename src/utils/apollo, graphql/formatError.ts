import {GraphQLError} from 'graphql'

/**
 * extra fields get added in the top level of each error object
 * @param err
 */
export function formatError(err: GraphQLError) {
	return {_customField: "Hello", ...err}
}

