import {ErrorHandler} from '@/utils/typegraphql/middleware/ErrorHandler'
import {RedisPubSub} from 'graphql-redis-subscriptions'
import {AuthChecker, buildSchema} from 'type-graphql'
import {Container} from 'typedi'
import {publisher, subscriber} from '../../DB/redis'
import {NonEmptyArray} from 'type-graphql/dist/utils/types'
import {GlobalAuth} from '@/utils/typegraphql/middleware/GlobalAuth'

export type Resolvers = NonEmptyArray<Function> | NonEmptyArray<string>
export const createSchema = (resolvers: Resolvers) =>
	buildSchema({
		emitSchemaFile: {
			path: './src/graphql/generated/schema.graphql',
			commentDescriptions: true,
		}, // for testing
		validate: true,
		// has access only to "exception" error field, as opposed to apollo-server error formatter
		globalMiddlewares: [
			ErrorHandler,
			// DBRequestCounter,
			// GlobalAuth
		],
		container: Container,
		
		resolvers,
		authChecker,
		pubSub,
	})

const authChecker: AuthChecker<any> = (
	{
		context,
		args,
		info,
		root,
	}, roles,
) => {
	return true
}

/**
 * paradigm where (citing Wikipedia) senders (publishers) are not programmed to send their messages to specific
 * receivers (subscribers). Rather, published messages are characterized into channels, without knowledge of what (if
 * any) subscribers there may be. Subscribers express interest in one or more channels, and only receive messages that
 * are of interest, without knowledge of what (if any) publishers there are. This decoupling of publishers and
 * subscribers can allow for greater scalability and a more dynamic network topology.
 */
export const pubSub = new RedisPubSub({
	publisher,
	subscriber,
})
