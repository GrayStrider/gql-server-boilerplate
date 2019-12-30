import faker from 'faker'
import gql from 'graphql-tag'
import {times} from 'lodash'
import {Connection, EntityManager} from 'typeorm'
import {setupTests} from '../../test-utils/setupTests'
import {postQueryTyped} from '../../utils/apollo, graphql/postQuery'
import {isUp} from '../../utils/isUp'
import {UserNew} from '../entity/User'
import {Countries} from './CountriesList'

let conn: Connection
let db: EntityManager
beforeAll(async () => {
	({conn} = await setupTests())
	db = conn.manager
})


it(`should repeat promises`, async () => {
	const res = await Promise.all(
		Array(10).fill(isUp('http://localhost:4000')))
	
	expect(res).toStrictEqual(Array(10).fill(true))
	
	
})

it(`should create 10 new users`, async () => {
  const users = await Promise.all(
    times(10, (iter) =>
      postQueryTyped<UserNew>(gql`mutation {
          userCreate(
              firstName: "${faker.name.firstName() + iter}",
              lastName: "${faker.name.lastName()}",
		          password: "${faker.internet.password()}",
		          email: "${faker.internet.email()}",
		          country: ${faker.random.arrayElement(Object.keys(Countries))},
		          age: ${faker.random.number(100)}
          ) {
		          id
		          age
		          country
		          createdDate
		          email
		          name
          }
      }`)))
	
	expect(users).toHaveLength(10)

})

it(`should create new user`, async () => {

  const {id} = await postQueryTyped<UserNew>(gql`mutation {
      userCreate(country: Afghanistan, email: "zhoga.ivan@gmail.com",
          firstName: "Ivan", lastName: "Zhoga", age: 24, password: "123") {
          id
      }
  }`)


	
	expect(id).toBeTruthy()
})

it(`should search the users by paremeters`, async () => {
  const firstNames = await postQueryTyped<UserNew>(gql`query {
      users(searchBy: {
          firstName: "Ivan",
          lastName: "Zhoga"
      }) {
          firstName
      }
  }`)
	expect(firstNames).toStrictEqual([{'firstName': 'Ivan'}])

})
