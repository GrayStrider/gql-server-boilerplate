import st, {SuperTest, Test} from 'supertest'
import Application from 'koa'
import {ASTNode, print} from 'graphql'
import {flattenGQLResponse} from '@/utils'

function supertest (app: Application, endpoint: string) {

	const request = st(app.callback())
	const post = async <T> (query: ASTNode) => request
		.post(endpoint)
		.send({query: print(query)})
		.then(res => res.body)
		.then(data => flattenGQLResponse<T>(data))
	
	
	return {request, post}

}

export {supertest, SuperTest, Test}
