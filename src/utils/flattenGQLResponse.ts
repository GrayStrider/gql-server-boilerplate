import {keys, head, values} from 'ramda'
import {GraphQLResponse} from 'graphql-request/dist/src/types'

/**
 * Refactored to be only used in GraphQL responses
 *
 * Yes the function actually returns T | V (input),
 * but the assumption here is that the consumer already knows what kind of data
 * he's gonna get, so that's mosly for convinience, and
 * you totally can specify incorrect types and get a runtime "undefined".
 * It's meant for use in tests, anyway.
 * Too much trouble handling these edge cases
 * @param response
 */
export default function flattenGQLResponse<T extends unknown> (response: GraphQLResponse): T {
	
	if (response.errors && response.errors.length > 0)
		throw new Error(response.errors[0].message)
	
	
	const {data} = response
	
	if (!data) return response as T
	if (keys(data).length > 1) return data as T
	
	/**
	 * Return the first (head)
	 * value (values) of the response
	 * same as Object.values(response)[0]
	 */
	return head(values(data)) as T
	
}

