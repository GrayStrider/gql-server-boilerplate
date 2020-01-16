import {UserCreateInput} from '@/models/UsersPlayground/user.inputs'
import faker from 'faker'
import gql from 'graphql-tag'
import {times} from 'lodash'
import {bb} from '@/utils/libsExport'
import {Countries} from './CountriesList'
import {SERVER_URL} from 'config/_consts'
import {GraphQLClient} from 'graphql-request'
import {print} from 'graphql'
import {flattenObject} from '@/utils/zz_misc/flattenObject'

export async function generateMockUsers(amount: number) {
	const fakes = times(amount, () => (<UserCreateInput>{
		firstName: faker.name.firstName(),
		lastName: faker.name.lastName(),
		password: faker.internet.password(),
		email: faker.internet.exampleEmail(),
		country: faker.random.arrayElement(Object.keys(Countries)),
		age: faker.random.number({max: 150, min: 18}),
	}))
	
	
	const endpoint = SERVER_URL + '/users'
	const testClient = new GraphQLClient(endpoint, {
		headers: {
			authorization: 'internal_call',
		},
	})
	const generated = await bb.all(fakes.map(fake =>
		
		testClient.request(print(query), {input: fake})
			.then(flattenObject),
	))
	
	return {
		fakes,
		generated,
	}
}

const query = gql`mutation userCreate($input: UserCreateInput!) {
    userCreate(userData: $input) {
        createdDate
        id
        firstName
        lastName
        password
        email
        country
        age
    }
}`
