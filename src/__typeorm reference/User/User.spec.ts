import * as faker from 'faker'
import gql from 'graphql-tag'
import {times} from 'lodash'
import R, {filter, head, includes, map, omit, pipe, prop} from 'ramda'
import {Connection, EntityManager} from 'typeorm'
import {setupTests} from '../../test-utils/setupTests'
import {Await} from '../../types/Await'
import {Mutation, PaginatedUserResponse, Query} from '../../types/generated/graphql'
import {P} from '../../types/GetOnePropertyOfType'
import {gqlRequest} from '../../utils/apollo, graphql/postQuery'
import {generateMockUsers} from './generateMockUsers'
import arrayContaining = jasmine.arrayContaining

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

describe('Users', async () => {
	it(`should create ${SAMPLE_SIZE} new users`, async () => {
		const act = map(omit(['id', 'createdDate']))(generated)
		expect(act).toStrictEqual(fakes)
	})
  it(`new user`, async () => {
    const {id} = await gqlRequest(gql`mutation {
        userCreate(userData: {
            country: Afghanistan, email: "zhoga.ivan@gmail.com",
            firstName: "Ivan", lastName: "Zhoga", age: 24, password: "123"
        }) {
            id
        }
    }`) as P<Mutation, 'userCreate'>
		expect(id).toBeTruthy()
  })
  it(`should search the users by paremeters`, async () => {
    const firstNames = await gqlRequest(gql`query {
        users(searchBy: {
            firstName: "Ivan",
            lastName: "g"
        }) {
            firstName
        }
    }`) as P<Query, 'users'>
		expect(firstNames[0].firstName).toStrictEqual('Ivan')

  })
  it.skip(`should add friends at random`, async () => {
    // TODO faker picks duplicate keys, have to be exhaustive

    const userIds = await gqlRequest<P<Query, 'users'>>(gql`{
        users {
            id
        }
    }`).then(value => value.map((user) => user.id))
		
		const randomUserIds = times(SAMPLE_SIZE / 2,
			() => faker.random.arrayElement(userIds))

	  const randomFriendIds = times(faker.random.number({min: 0, max: 10}),
			() => faker.random.arrayElement(userIds))
		
		console.log(randomFriendIds)
    const users = await Promise.all(randomUserIds.map((id) =>
    gqlRequest<P<Mutation, 'userModify'>>(gql`mutation modify($friends: [String!]) {
        userModify(
            userId: "${id}",
            changes: {
                friendsIds: $friends
            }) {
            friends {
                id
                name
            }
        }
    }`, {friends: randomFriendIds})))
    const res = await gqlRequest<P<Query, 'users'>>(gql`query {
        users {
            id
            friends {
                id
            }
        }
    }`)
		.then(filter(({id}) => includes(id, randomUserIds)))
		.then(map(prop('friends')))
		expect(res).toStrictEqual([])
  })

  describe('modify', async () => {
		let testUserId: string

    it(`should modify Country`, async () => {
			testUserId = await gqlRequest<P<Query, 'users'>>(gql`{
          users(searchBy: {lastName: "Zhoga"}) {
              id
          }
      }`).then(pipe(map(prop('id')), head))

      await gqlRequest(gql`mutation {
          userModify(userId: "${testUserId}", changes: {
              country: Algeria
          }) {
              country
          }
      }`)
      // probably excessive to fetch afer mutation...
      const country = await gqlRequest<P<Query, 'users'>>(gql`{
          users(searchBy: {lastName: "Zhoga"}) {
              country
          }
      }`).then(pipe(map(prop('country')), head))
			expect(country).toBe('Algeria')
    })

    it(`should add friends`, async () => {
			const r = faker.random.number
      const randomIds = await gqlRequest<PaginatedUserResponse>(gql`query {
          usersPaginated(
              startAt: ${r({min: 0, max: SAMPLE_SIZE})},
              upTo: ${r({min: 0, max: SAMPLE_SIZE})}) {
              items {
                  id
              }
          }
      }`)
			.then(pipe(prop('items'), map(prop('id'))))
			expect(Array.isArray(randomIds)).toBeTruthy()

      const addedFriendsIdsFromResponse =
      await gqlRequest<P<Mutation, 'userModify'>>(gql`mutation m($friends: [String!]){
          userModify(userId: "${testUserId}", changes: {
              friendsIds: $friends
              firstName: "Modified"
          }) {
              name
              friends {
                  id
              }
          }
      }`, {friends: randomIds})
			
			.then(pipe(prop('friends'), map(prop('id'))))
			
			expect(addedFriendsIdsFromResponse).toEqual(arrayContaining(randomIds))

    })
  })
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
			.then(prop('items'))
		
		expect(res).toHaveLength(10)
	})
	it(`with both variables`, async () => {
		const res = await gqlRequest<PaginatedUserResponse>(query, {upTo: 10, startAt: 50})
			.then((res) => res.items)
		
		expect(res).toHaveLength(1)
	})
  // everything else tested manually, have to track movement of id's here

})
