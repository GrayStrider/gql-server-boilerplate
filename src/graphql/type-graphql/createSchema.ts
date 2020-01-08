import {RedisPubSub} from 'graphql-redis-subscriptions'
import {AuthChecker, buildSchema, registerEnumType} from 'type-graphql'
import {DBRequestCounter} from '../../DB/__typeorm reference/Middleware/DBRequestCounter'
import {UserResolver} from '../../DB/__typeorm reference/User/resolver'
import {SubscriptionsResolver} from '../../DB/__typeorm reference/User/subscriptionsResolver'
import {Context} from '../apollo/context'
import {TagResolver, TaskResolver} from '../../models/modules/KBF/resolvers'
import {publisher, subscriber} from '../../DB/redis'
import {AuthRoles} from '../../auth/authRoles'

export const createSchema = () =>
	buildSchema({
		emitSchemaFile   : './src/graphql/generated/schema.graphql', // for testing
		validate         : true,
		// has access only to "exception" error field, as opposed to apollo-server error formatter
		globalMiddlewares: [DBRequestCounter],
		
		resolvers: [
			UserResolver,
			TagResolver,
			TaskResolver,
			SubscriptionsResolver,
			
			// ExampleEntityResolver,
			// PhotoResolver,
			// AlbumResolver,
			// ChangePasswordResolver,
			// ConfirmUserResolver,
			// ForgotPasswordResolver,
			// LoginResolver,
			// LogoutResolver,
			// MeResolver,
			// RegisterResolver,
			// CreateUserResolver,
			// CreateProductResolver,
			// ProfilePictureResolver,
			// AuthorBookResolver
		],
		authChecker,
		pubSub,
	})

const authChecker: AuthChecker<Context> = (
	{
		root, args, context,
		info,
	}, roles,
) => {
	return roles.includes(AuthRoles.ADMIN)
}


const pubSub = new RedisPubSub({
	publisher,
	subscriber,
})
