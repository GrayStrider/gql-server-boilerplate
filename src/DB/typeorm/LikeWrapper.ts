import {AnyObject} from 'tsdef'
import {Like} from 'typeorm'

/**
 * Takes input class and wraps
 * string fields into Like($string$) clause
 * for more approachable typeorm search
 *
 * add [key: string]: any; to class for indexing to work
 *
 * MUTATES input instance, idk
 * how to return it properly
 *
 * @param input input class
 */
export function LikeWrapper (input: AnyObject) {

	for (const field in input) if (Object.prototype.hasOwnProperty.call(input, field)) if (typeof input[field] === 'string' && field !== 'id') {

		input[field] = Like(`%${input[field]}%`)

	}


}
