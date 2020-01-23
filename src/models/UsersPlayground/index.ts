import UserResolver from './user.resolver'
import {createSchema, genericApolloServer} from '@/graphql'
import {sig} from '@/utils/libsExport'
import {SERVER_URL} from 'config/_consts'
import Countries from '@/models/UsersPlayground/lib/CountriesList'
import UserNew from '@/models/UsersPlayground/entity/User'
import generateMockUsers from '@/models/UsersPlayground/lib/generateMockUsers'
import AuthRoles from '@/models/UsersPlayground/auth/authRoles'
import howCommonIsName from '@/models/UsersPlayground/lib/HowCommonName'
import NotificationResolver from '@/models/UsersPlayground/subscriptions/Notification/notification.resolver'

export * from '@/models/UsersPlayground/user.inputs'

export default async function makeUsersServer () {
	
	const name = 'users'
	const path = `/${name}`
	const schema = await createSchema([UserResolver], name)
	sig.info(SERVER_URL + path)
	return genericApolloServer(schema)
		.getMiddleware({path})
	
}
export {
	Countries,
	UserNew,
	generateMockUsers,
	AuthRoles,
	UserResolver,
	howCommonIsName,
	NotificationResolver
	
}

