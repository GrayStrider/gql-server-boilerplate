import {ASTNode, print} from 'graphql'
import {request} from 'graphql-request'
import {Variables, GraphQLResponse} from 'graphql-request/dist/src/types'
import {AnyObject} from 'tsdef'
import {GQL_URL} from '@config'
import {Mutation, Query} from '@/graphql/generated/typings'
import {flattenGQLResponse} from '@/utils'


async function gqlRequest<T> (query: ASTNode, variables?: Variables, url?: string): Promise<T>
async function gqlRequest<T, K> (query: ASTNode, variables?: Variables, url?: string): Promise<[T, K]>
async function gqlRequest<T, K, U> (query: ASTNode, variables?: Variables, url?: string): Promise<[T, K, U]>


async function gqlRequest<T, K, U> (
	query: ASTNode, variables?: Variables, url: string = GQL_URL
) {
	
	const res: GraphQLResponse = await request(
		url, print(query), variables
	)
	
	return flattenGQLResponse(res)
	
}


type KeyofQuery = keyof Omit<Query, '__typename'>
type KeyofMutation = keyof Omit<Mutation, '__typename'>

async function gqlreq (
	type: 'query' | 'mutation', obj: KeyofMutation | KeyofQuery, query: ASTNode, variables?: AnyObject, url: string = GQL_URL
) {
	
	const res = await request(
		url, print(query), variables
	)
	return flattenGQLResponse(res)
	
}

export {gqlRequest, gqlreq}
