import {UserCreateInput} from '@/models/UsersPlayground/user.inputs'
import faker from 'faker'
import gql from 'graphql-tag'
import {times} from 'lodash'
import {bb} from '@/utils/libsExport'
import {Mutation} from '@/graphql/generated/typings'
import {P} from '@/types/GetOnePropertyOfType'
import {gqlRequest} from '@/graphql/utils/postQuery'
import {Countries} from './CountriesList'
import {SERVER_URL} from 'config/_consts'

export async function generateMockUsers(amount: number) {
	const fakes = times(amount, () => (<UserCreateInput>{
		firstName: faker.name.firstName(),
		lastName : faker.name.lastName(),
		password : faker.internet.password(),
		email    : faker.internet.exampleEmail(),
		country  : faker.random.arrayElement(Object.keys(Countries)),
		age      : faker.random.number({max: 150, min: 18}),
	}))
	
	const generated = await bb.all(fakes.map(fake =>
		gqlRequest<P<Mutation, 'userCreate'>>(query, {input: fake},
			SERVER_URL + '/users')))
	
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
