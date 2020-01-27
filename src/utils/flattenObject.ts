import {keys, head, values} from 'ramda'
import {AnyObject} from 'tsdef'

/**
 * Yes the function actually returns T | V (input),
 * but the assumption here is that the consumer already knows what kind of data
 * he's gonna get, so that's mosly for convinience, and
 * you totally can specify incorrect types and get a runtime "undefined".
 * It's meant for use in tests, anyway.
 * Too much trouble handling these edge cases
 * @param input
 */
export default function flattenObject<T extends unknown> (input: AnyObject): T {
	
	if (keys(input).length > 1)
		return input as T
	

	/**
	 * Return the first (head)
	 * value (values) of the input
	 * same as Object.values(input)[0]
	 */
	return head(values(input)) as T
	
}

