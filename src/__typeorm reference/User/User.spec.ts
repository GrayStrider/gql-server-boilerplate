import gql from 'graphql-tag'
import {Connection, EntityManager} from 'typeorm'
import {User} from '../../entity/User'
import {setupTests} from '../../test-utils/setupTests'
import {postQueryTyped} from '../../utils/postQuery'

let conn: Connection
let db: EntityManager
beforeAll(async () => {
	conn = await setupTests()
	db = conn.manager
})

it(`should create new user`, async () => {
  const {id} = await postQueryTyped<User>(gql`mutation {
		  userCreate(country: Afghanistan, email: "zhoga.ivan@gmail.com",
		  firstName: "Ivan", lastName: "Zhoga", age: 24, password: "123") {
				  id
		  }
  }`)
	
	const firstNames = await postQueryTyped<User>(gql`query {
			users(firstName: "Ivan") {
					firstName
			}
	}`)
	
	expect(id).toBeTruthy()
	expect(firstNames).toStrictEqual([{"firstName": "Ivan"}])
});
