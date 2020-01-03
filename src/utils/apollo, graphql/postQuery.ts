import {ASTNode, print} from 'graphql'
import request from 'graphql-request'
import {Variables} from 'graphql-request/dist/src/types'
import gql from 'graphql-tag'
import {AnyObject} from 'tsdef'
import {GQL_URL} from '../../../config/_consts'
import {Query} from '../../types/generated/graphql'
import {flattenObject} from '../transform'


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
	return mainField ? res?.[mainField] : res
}


export async function gqlRequest<T>(query: ASTNode, variables?: Variables, url?: string): Promise<T>
export async function gqlRequest<T, K>(query: ASTNode, variables?: Variables, url?: string): Promise<[T, K]>
export async function gqlRequest<T, K, U>(query: ASTNode, variables?: Variables, url?: string): Promise<[T, K, U]>


export async function gqlRequest<T, K, U>(query: ASTNode, variables?: Variables, url: string = GQL_URL) {
	const res: AnyObject | any[] = await request(url, print(query), variables)
	
	
	// return transform(res)
	return flattenObject(res)
}


export async function gqlreq<T extends keyof Omit<Query, '__typename'>, R extends Query[T], V extends AnyObject>
(type: 'query', obj: T, query: ASTNode, variables?: V, url?: string): Promise<R>
// export async function gqlreq<T, K>(query: ASTNode, variables?: Variables, url?: string): Promise<[T, K]>
// export async function gqlreq<T, K, U>(query: ASTNode, variables?: Variables, url?: string): Promise<[T, K, U]>
//
//
export async function gqlreq<T extends keyof Omit<Query, '__typename'>, R extends Query[T], V extends AnyObject>
(type: 'query', obj: keyof Omit<Query, '__typename'>, query: ASTNode, variables?: V, url: string = GQL_URL) {
	const res: AnyObject | any[] = await request(url, print(query), variables)
	
	
	// return transform(res)
	return flattenObject(res)
}

async function main() {
  gqlreq('query', 'usersPaginated', gql`{
              usersPaginated {
                  items {
                      id
                  }
              }
          }`,
		{startAt: 30}
  ).then(res => res.items.map((item) => item.name))
}

//
function sendResult<T = never>(send: any, result: NoInfer<T>) {
	send(result);
}
sendResult<{test: string}>({foo: 'bar'}, {test: 'foo'})



type NoInfer<T> = [T][T extends any ? 0 : never];
