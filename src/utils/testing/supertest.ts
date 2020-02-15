import st, {SuperTest, Test} from 'supertest'
import Application from 'koa'
import {ASTNode, print} from 'graphql'
import {flattenGQLResponse} from '@/utils'

function supertest (app: Application, gqlEndpoint: string) {

	const request = st(app.callback())
	const post = async <T> (query: ASTNode) => request
		.post(gqlEndpoint)
		.send({query: print(query)})
		.then(res => flattenGQLResponse<T>(res.body.data))
	
	
	return {request, post}

}

export {supertest, SuperTest, Test}
