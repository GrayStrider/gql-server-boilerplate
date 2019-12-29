import {GraphQLError} from 'graphql'
import * as Sentry from '@sentry/node'


/**
 * extra fields get added in the top level of each error object
 * @param err
 */
export function formatError(err: GraphQLError) {
	Sentry.captureException(err)
	return {_customField: "Hello", ...err}
}

