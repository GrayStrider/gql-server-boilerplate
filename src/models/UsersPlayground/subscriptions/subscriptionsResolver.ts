import {Notification, NotificationPayload} from '@/models/UsersPlayground/subscriptions/Notification'
import {SUB_TOPICS} from '@/models/UsersPlayground/subscriptions/topics'
import {Errors} from '@/utils/Errors'
import {Arg, Mutation, Publisher, PubSub, Root, Subscription} from 'type-graphql'
import uuid from 'uuid'


export class SubscriptionsResolver {
	@Subscription({
		topics: ({args, context, payload}) => {
			if (!context.connection.context.authorized) {
				console.log('not authorized')
				// doesn't work with schema stiching,
				// probably ok to wait till 1.0 and @Authorised support
				// https://github.com/MichalLytek/type-graphql/issues/175
				// throw new Errors.Authenfication
				// throw new GraphQLError('not authorized')
			}
			return SUB_TOPICS.NOTIFICATIONS
			
		},
		filter: ({payload, args, context, info}) => {
			return true
		},
	})
	newNotification(@Root() {id, message}: NotificationPayload): Notification {
		return {id, message, date: new Date()}
	}
	
	@Mutation(returns => Boolean)
	async ping(
		@Arg('message') message: string,
		@PubSub(SUB_TOPICS.NOTIFICATIONS) dispatch: Publisher<NotificationPayload>,
	) {
		
		await dispatch({message, id: uuid()})
		return true
	}
	
}
