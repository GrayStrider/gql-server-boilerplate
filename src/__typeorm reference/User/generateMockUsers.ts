import faker from 'faker'
import gql from 'graphql-tag'
import {times} from 'lodash'
import {Mutation} from '../../graphql/generated/typings'
import {P} from '../../types/GetOnePropertyOfType'
import {gqlRequest} from '../../graphql/utils/postQuery'
import {bb} from '../../utils/libsExport'
import {Countries} from './CountriesList'

export async function generateMockUsers(amount: number) {
	const fakes = times(amount, () => ({
		firstName: faker.name.firstName(),
		lastName : faker.name.lastName(),
		password : faker.internet.password(),
		email    : faker.internet.exampleEmail(),
		country  : faker.random.arrayElement(Object.keys(Countries)),
		age      : faker.random.number(100),
	}))
	
	const generated = await bb.all(fakes.map(fake =>
		gqlRequest<P<Mutation, 'userCreate'>>(query, {input: fake})))
	
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

const foo = () => new bb((resolve, reject, onCancel) =>
	resolve(1))
