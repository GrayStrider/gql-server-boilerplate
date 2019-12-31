import * as faker from 'faker'
import gql from 'graphql-tag'
import {omit} from 'lodash'
import {Connection, EntityManager} from 'typeorm'
import {setupTests} from '../../test-utils/setupTests'
import {Await} from '../../types/Await'
import {gqlRequest} from '../../utils/apollo, graphql/postQuery'
import {PaginatedUserResponse} from '../../utils/type-graphql/paginatedResponse'
import {UserNew} from '../entity/User'
import {generateMockUsers} from './generateMockUsers'

let conn: Connection
let db: EntityManager
let fakes: Await<ReturnType<typeof generateMockUsers>>['fakes']
let generated: Await<ReturnType<typeof generateMockUsers>>['generated']

const SAMPLE_SIZE = 50

beforeAll(async () => {
	({conn} = await setupTests())
	db = conn.manager;
	({fakes, generated} = await generateMockUsers(SAMPLE_SIZE))
	
})

import {times} from 'lodash'

describe('Users', async () => {
	it(`should create ${SAMPLE_SIZE} new users`, async () => {
		
		expect(generated.map(fake =>
			omit(fake, 'id', 'createdDate')))
			.toStrictEqual(fakes)
		
	})
  it(`should create new user`, async () => {

    const {id} = await gqlRequest<UserNew>(gql`mutation {
        userCreate(userData: {
            country: Afghanistan, email: "zhoga.ivan@gmail.com",
            firstName: "Ivan", lastName: "Zhoga", age: 24, password: "123"
        }) {
            id
        }
    }`)
		
		
		expect(id).toBeTruthy()
  })
  it(`should search the users by paremeters`, async () => {
    const firstNames = await gqlRequest<UserNew[]>(gql`query {
        users(searchBy: {
            firstName: "Ivan",
            lastName: "g"
        }) {
            firstName
        }
    }`)
		expect(firstNames[0].firstName).toStrictEqual('Ivan')

  })
  it(`should modify user`, async () => {
    const id = await gqlRequest<UserNew[]>(gql`{
        users(searchBy: {lastName: "Zhoga"}) {
            id
        }
    }`).then(value => value.map((user) => user.id)[0])
    await gqlRequest(gql`mutation {
        userModify(userId: "${id}", changes: {
            country: Algeria
        }) {
            country
        }
    }`)
    const country = await gqlRequest<UserNew[]>(gql`{
        users(searchBy: {lastName: "Zhoga"}) {
            country
        }
    }`).then(value => value.map(value1 => value1.country)[0])
		expect(country).toBe('Algeria')


  })

  describe('pagination', async () => {
    const query = gql`query pagination($upTo: Float, $startAt: Float) {
        usersPaginated(upTo: $upTo, startAt: $startAt) {
            items {
                id
                name
            }
        }
    }`
		
		it(`with up to`, async () => {
			
			const res = await gqlRequest<PaginatedUserResponse>(query, {upTo: 10})
				.then((res) => res.items)
			
			expect(res).toHaveLength(10)
		})
		it(`with both variables`, async () => {
			const res = await gqlRequest<PaginatedUserResponse>(query, {upTo: 10, startAt: 50})
				.then((res) => res.items)
			
			expect(res).toHaveLength(1)
		})
    // everything else tested manually, have to track movement of id's here

  })


  it(`should add friends`, async () => {
    const userIds = await gqlRequest<UserNew[]>(gql`{
        users {
            id
        }
    }`).then(value => value.map((user) => user.id))
  
    const randomHalf = times(SAMPLE_SIZE / 2, () =>
      faker.random.arrayElement(userIds))
    
    Promise.all(randomHalf.map((id) => {
      gqlRequest(gql`mutation {
        userModify(userId: "${id}", changes: {age: 100}) {
          age
        }
      }`)
    }))
  
  
  })
})

