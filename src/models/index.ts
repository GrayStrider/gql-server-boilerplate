import {signale} from '@/utils'
import {SERVER_URL} from '@config'
import generateMockUsers from '@/models/lib/generateMockUsers'
import howCommonIsName from '@/models/lib/HowCommonName'
import UserNew from '@/models/entity/User'
import Countries from '@/models/enums/Countries'
import createSchema from '@/graphql/type-graphql/createSchema'
import genericApolloServer from '@/graphql/apollo/genericServer'
import {UsersResolver, RegisterResolver, ModifyResolver, LoginResolver, GenerateMocksResolver, CreateResolver} from '@/models/resolvers'

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
	signale.info(SERVER_URL + path)
	return genericApolloServer(schema)
		.getMiddleware({path})
	
}

export {
	UserNew,
	generateMockUsers,
	howCommonIsName,
	Countries
}
