process.env.endpoint = 'users'
import * as faker from 'faker'
import gql from 'graphql-tag'
import {head, map, omit, pipe, prop} from 'ramda'
import {Connection} from 'typeorm'
import {setupTests} from 'src/utils/test-utils/setupTests'
import {Mutation, PaginatedUserResponse, Query} from 'src/graphql/generated/typings'
import {gqlRequest} from 'src/graphql/utils/postQuery'
import {generateMockUsers} from 'src/models/UsersPlayground/lib/generateMockUsers'
import {Await} from 'src/types/Await'
import {P} from 'src/types/GetOnePropertyOfType'
import * as http from 'http'
import arrayContaining = jasmine.arrayContaining

let conn: Connection
let server: http.Server | null
let fakes: Await<ReturnType<typeof generateMockUsers>>['fakes']
let generated: Await<ReturnType<typeof generateMockUsers>>['generated']

const SAMPLE_SIZE = 50

beforeAll(async () => {

	({conn} = await setupTests());
	({fakes, generated} = await generateMockUsers(SAMPLE_SIZE))

})
afterAll(async done => {

	await conn.close()
	server?.close()
	done()

})

describe('Users', () => {

	it(`should create ${SAMPLE_SIZE} new users`, async () => {

		const act = map(omit(['id', 'createdDate']))(generated)
		expect(act).toStrictEqual(fakes)

	})
	it('new user', async () => {

		const {id} = await gqlRequest<P<Mutation, 'userCreate'>>(gql`mutation {
        userCreate(userData: {
            country: Afghanistan, email: "foo.bar@gmail.com",
            firstName: "Ivan", lastName: "Zhoga", age: 24, password: "123"
        }) {
            id
        }
    }`)
		expect(id).toBeTruthy()

	})

	it('should search the users by parameters', async () => {

		const act = await gqlRequest<P<Query, 'users'>>(gql`query {
        users(searchBy: {
            firstName: "Ivan",
            lastName: "Zhoga"
        }) {
            firstName
        }
    }`).then(map(x => x.firstName))
		expect(head(act)).toStrictEqual('Ivan')

	})

	describe('modify', () => {

		let testUserId: string

		it('should modify Country', async () => {

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
			// Probably excessive to fetch afer mutation...
			const country = await gqlRequest<P<Query, 'users'>>(gql`{
          users(searchBy: {lastName: "Zhoga"}) {
              country
          }
      }`).then(pipe(map(prop('country')), head))
			expect(country).toBe('Algeria')

		})

		it('should add friends', async () => {

			const randomIds = await gqlRequest<PaginatedUserResponse>(gql`query {
          usersPaginated(
              startAt: ${faker.random.number({min: 0, max: SAMPLE_SIZE})},
              upTo: ${faker.random.number({min: 0, max: SAMPLE_SIZE})}) {
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
describe('pagination', () => {

	const query = gql`query pagination($upTo: Float, $startAt: Float) {
      usersPaginated(upTo: $upTo, startAt: $startAt) {
          items {
              id
              name
          }
      }
  }`

	it('with up to', async () => {

		const res = await gqlRequest<PaginatedUserResponse>(query, {upTo: 10})
			.then(prop('items'))

		expect(res).toHaveLength(10)

	})
	it('with both variables', async () => {

		const res = await gqlRequest<PaginatedUserResponse>(query, {upTo: 10,
			startAt: 50})
			.then(res2 => res2.items)

		expect(res).toHaveLength(1)

	})
	// Everything else tested manually, have to track movement of id's here

})
