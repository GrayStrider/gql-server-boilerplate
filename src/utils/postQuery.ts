import {ASTNode, print} from 'graphql'
import request from 'graphql-request'
import {AnyObject} from 'tsdef'
import {GQL_URL} from '../../config/consts'
import {warn} from './log'

/**
 * dispatch GQL query
 * @param url server url, defaults to GQL_URL env. variable
 * @param query graphql-tag gql\`{...}\` query
 * @param mainField select one field from respose object:
 * query "tasks" will respond with object `{tasks: [...]}`, and we would have to do `.then(value => value["tasks"])`.
 *   Specifying `"tasks"` in mainField parameter will return the array right away
 */
export const postQuery = async <T = AnyObject>(query: ASTNode, mainField?: string, url: string = GQL_URL): Promise<T> => {
	const res: AnyObject = await request(url, print(query))
		.catch(warn)
	return mainField ? res?.[mainField] : res
}
