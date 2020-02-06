import {GraphQLResponse, GraphQLError} from 'graphql-request/dist/src/types'
import {flattenGQLResponse} from '@/utils/index'

describe('flattenGQLResponse', () => {

	it(`should return the input
	 when thre's more than 1 key`, async () => {

		expect.assertions(1)
		const input = {foo: 1, bar: 2}
		const res: GraphQLResponse = {data: input, status: 200}
		expect(flattenGQLResponse(res)).toStrictEqual(input)
	
	})
	
	it(`should return the value of the first key
	 when there's only one key`, async () => {

		expect.assertions(1)
		const input = {foo: 'bar'}
		const res: GraphQLResponse = {data: input, status: 200}
		expect(flattenGQLResponse(res))
			.toStrictEqual(input.foo)
	  
	})
	
	it('should return errors', async () => {

		expect.assertions(1)
		const err: GraphQLError = {message: 'error123'} as GraphQLError
		const res: GraphQLResponse = {errors: [err], status: 400}
		expect(() => flattenGQLResponse(res)).toThrow(err.message)
	
	})

})

