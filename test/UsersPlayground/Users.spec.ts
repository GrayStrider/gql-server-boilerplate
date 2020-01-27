import supertest, {SuperTest, Test} from 'supertest'
import {print, ASTNode} from 'graphql'
import gql from 'graphql-tag'
import {Validator} from 'class-validator'
import {AnyObject} from 'tsdef'
import main from 'src/server'
import {flattenObject} from 'src/utils'
import {P} from 'src/types'
import {Query, Mutation} from 'src/graphql/generated/typings'

const check = new Validator()

describe('/users', () => {

	let request: SuperTest<Test>
	let post: <T extends AnyObject>(query: ASTNode) => Promise<T>
	
	beforeAll(async () => {

		request = supertest((await main()).callback())
		post = async <T extends AnyObject>(query: ASTNode) => request
			.post('/users')
			.send({query: print(query)})
			.then(res => res.body.data)
			.then(data => flattenObject<T>(data))
		
	})

	it('should return empty array', async () => {

		expect.assertions(1)
		const query = gql`query {
        users {
            id
        }
    }`
		const res = await post<P<Query, 'users'>>(query)
		
		expect(res).toStrictEqual([])
	
	})
	
	it('should create user', async () => {

		expect.assertions(1)
		const query = gql`mutation {
        userCreate(userData: {
            country: Afghanistan, email: "foo.bar@gmail.com",
            firstName: "Ivan", lastName: "Zhoga",
						age: 24, password: "123"
        }) {
            id
        }
    }`
		const res = await post<P<Mutation, 'userCreate'>>(query)
		
		expect(check.isUUID(res.id)).toBe(true)
	
	})


})
