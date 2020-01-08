import {RedisPubSub} from 'graphql-redis-subscriptions'
import {AuthChecker, buildSchema, registerEnumType} from 'type-graphql'
import {User1Resolver} from '../../__dataloader/modules/User1'
import {DBRequestCounter} from '../../__typeorm reference/Middleware/DBRequestCounter'
import {UserResolver} from '../../__typeorm reference/User/resolver'
import {SubscriptionsResolver} from '../../__typeorm reference/User/subscriptionsResolver'
import {Context} from '../apollo, graphql/context'
import {TagResolver, TaskResolver} from '../../modules/KBF/resolvers'
import {publisher, subscriber} from '../../redis'
import {AuthRoles} from './authRoles'

export const createSchema = () =>
	buildSchema({
		emitSchemaFile   : './src/utils/schema.graphql', // for testing
		validate         : true,
		// has access only to "exception" error field, as opposed to apollo-server error formatter
		globalMiddlewares: [DBRequestCounter],
		
		resolvers: [
			UserResolver,
			TagResolver,
			TaskResolver,
			User1Resolver,
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
	context
	return roles.includes(AuthRoles.ADMIN)
}


const pubSub = new RedisPubSub({
	publisher,
	subscriber,
})
