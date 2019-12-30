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

function GQLquote(str: string) {
	
	return `"${str}"`
}


it(`should create 50 new users`, async () => {
	const fakes = times(50, num => ({
		firstName: faker.name.firstName(),
		lastName : faker.name.lastName(),
		password : faker.internet.password(),
		email    : faker.internet.exampleEmail(),
		country  : faker.random.arrayElement(Object.keys(Countries)),
		age      : faker.random.number(100)
	}))
  const query = gql`mutation userCreate($input: UserCreateInput!) {
      userCreate(userData: $input) {
          firstName
          lastName
          password
          email
          country
          age
      }
  }`
	const generated = await Promise.all(fakes.map((fake) =>
		postQueryTyped<UserNew>(query, {input: fake})))
	expect(generated).toStrictEqual(fakes)

})

it(`should create new user`, async () => {

  const {id} = await postQueryTyped<UserNew>(gql`mutation {
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
