import {keys, head, values} from 'ramda'

export default function flattenObject (input: object) {
	
	return keys(input).length > 1
		? input
		: head(values(input))
	
}

