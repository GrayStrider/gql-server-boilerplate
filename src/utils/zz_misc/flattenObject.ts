import {keys, values, head} from 'ramda'

export function flattenObject (input: object) {

	return keys(input).length > 1
		? input
		: head(values(input))

}
