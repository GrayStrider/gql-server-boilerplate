import {sig} from '@/utils'
import {SERVER_URL} from '@config'
import generateMockUsers from '@/models/UsersPlayground/lib/generateMockUsers'
import howCommonIsName from '@/models/UsersPlayground/lib/HowCommonName'
import UserNew from '@/models/UsersPlayground/entity/User'
import Countries from '@/models/UsersPlayground/lib/CountriesList'
import createSchema from '@/graphql/type-graphql/createSchema'
import genericApolloServer from '@/graphql/apollo/genericServer'
import {UsersResolver, RegisterResolver, ModifyResolver, LoginResolver, GenerateMocksResolver, CreateResolver} from '@/models/UsersPlayground/resolvers'

export default async function makeUsersServer () {
	
	const name = 'users'
	const path = `/${name}`
	const schema = await createSchema([
		
		CreateResolver,
		GenerateMocksResolver,
		LoginResolver,
		ModifyResolver,
		RegisterResolver,
		UsersResolver,
	
	], name)
	sig.info(SERVER_URL + path)
	return genericApolloServer(schema)
		.getMiddleware({path})
	
}

export {
	UserNew,
	generateMockUsers,
	howCommonIsName,
	Countries
}

