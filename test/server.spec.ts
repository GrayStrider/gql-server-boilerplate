import {SuperTest, Test} from 'supertest'
import {ASTNode} from 'graphql'
import {Validator} from 'class-validator'
import main from 'src/server'
import {sleep, supertest, gql} from 'src/utils'
import {P} from 'src/types'
import {Query, Mutation} from 'src/graphql/generated/typings'
import Logger, {log} from 'src/graphql/typedi/services/Logger'

const check = new Validator()

describe('server', () => {
	
	let request: SuperTest<Test>
	let post: <T>(query: ASTNode) => Promise<T>
	
	beforeAll(async () => {
		
		({request, post} = supertest(await main(), '/example'))
		
	})
	afterAll(async () => {
		
		// Avoid jest open handle error
		await sleep(500)
		
	})
	
	it('should start the server and redirect', async () => {
		
		expect.assertions(1)
		const res = await request.get('/foobar')
		expect(res.status).toBe(302)
		
	})
	
	it('should expose graphql endpoint', async () => {

		expect.assertions(1)
		const res = await request.get('/example')
		expect(res.status).toBe(400) // TODO
	
	})

	it('should submit mutation', async () => {

		expect.assertions(2)
		const query = gql`mutation {
        create {
            id
            property
        }
    }`
		
		const {id, property} = await post<P<Mutation, 'create'>>(query)
		expect(property).toBe('exampleValue')
		expect(check.isUUID(id)).toBe(true)
	
	})

	it('should submit query', async () => {

		expect.assertions(2)

		const res = await post<P<Query, 'example'>>(
			gql`query {
          example {
              id
              property
          }
      }`
		).then(val => val[0])
		expect(check.isUUID(res.id)).toBe(true)
		expect(res.property).toBe('exampleValue')
	
	})
	
	it('should log requests', async () => {

		expect.assertions(1)
	  expect(log).toHaveBeenCalledTimes(2)
	
	})

})
