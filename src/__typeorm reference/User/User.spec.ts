import gql from 'graphql-tag'
import {Connection, EntityManager} from 'typeorm'
import {User} from '../../entity/User'
import {setupTests} from '../../test-utils/setupTests'
import {postQueryTyped} from '../../utils/apollo, graphql/postQuery'
import {UserNew} from '../entity/User'

let conn: Connection
let db: EntityManager
beforeAll(async () => {
	({conn} = await setupTests())
	db = conn.manager
})

it(`should create new user`, async () => {
  const {id} = await postQueryTyped<UserNew>(gql`mutation {
		  userCreate(country: Afghanistan, email: "zhoga.ivan@gmail.com",
		  firstName: "Ivan", lastName: "Zhoga", age: 24, password: "123") {
				  id
		  }
  }`)
	
	const firstNames = await postQueryTyped<UserNew>(gql`query {
			users(firstName: "Ivan") {
					firstName
			}
	}`)
	
	expect(id).toBeTruthy()
	expect(firstNames).toStrictEqual([{"firstName": "Ivan"}])
});

it(`should search the users by paremeters`, () => {

});
