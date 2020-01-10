import {ErrorHandler} from '@/utils/middleware/ErrorHandler'
import {RedisPubSub} from 'graphql-redis-subscriptions'
import {AuthChecker, buildSchema} from 'type-graphql'
import {AuthRoles} from '@/models/UsersPlayground/auth/authRoles'
import {DBRequestCounter} from '@/utils/middleware/DBRequestCounter'
import {UserResolver} from '@/models/UsersPlayground/resolvers/resolver'
import {SubscriptionsResolver} from '@/models/UsersPlayground/subscriptions/subscriptionsResolver'
import {publisher, subscriber} from '../../DB/redis'
import {TagResolver, TaskResolver} from '@/models/KBF/resolvers'
import {Context} from '../apollo/context'

export const createSchema = () =>
	buildSchema({
		emitSchemaFile: {
			path: './src/graphql/generated/schema.graphql',
			commentDescriptions: true,
		}, // for testing
		validate: true,
		// has access only to "exception" error field, as opposed to apollo-server error formatter
		globalMiddlewares: [ErrorHandler, DBRequestCounter],
		
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

/**
* paradigm where (citing Wikipedia) senders (publishers) are not programmed to send their messages to specific receivers (subscribers). Rather, published messages are characterized into channels, without knowledge of what (if any) subscribers there may be. Subscribers express interest in one or more channels, and only receive messages that are of interest, without knowledge of what (if any) publishers there are. This decoupling of publishers and subscribers can allow for greater scalability and a more dynamic network topology.
 */
const pubSub = new RedisPubSub({
	publisher,
	subscriber,
})
