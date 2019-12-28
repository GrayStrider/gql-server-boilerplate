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

export async function postQuery<T = Array<{ [key: string]: any }>>(query: ASTNode, mainField?: string, url: string = GQL_URL): Promise<{ [key: string]: T }> {
	const res: AnyObject = await request(url, print(query))
		.catch(warn)
	return mainField ? res?.[mainField] : res
}


import {toArray} from 'lodash'


export async function postQueryTyped<T>(query: ASTNode, url?: string): Promise<[T]>
export async function postQueryTyped<T, K>(query: ASTNode, url?: string): Promise<[T, K]>
export async function postQueryTyped<T, K, U>(query: ASTNode, url?: string): Promise<[T, K, U]>


export async function postQueryTyped<T, K, U>(query: ASTNode, url: string = GQL_URL) {
	const res: AnyObject = await request(url, print(query))
		.catch(warn)
	
	
	return toArray(res) as any
}


