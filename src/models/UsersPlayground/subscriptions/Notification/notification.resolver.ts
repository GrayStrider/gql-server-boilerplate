import {Notification, NotificationPayload} from '@/models/UsersPlayground/subscriptions/Notification/notification.model'
import {SUB_TOPICS} from '@/models/UsersPlayground/subscriptions/subscriptions.topics'
import {Errors} from '@/utils/Errors'
import {Arg, Mutation, Publisher, PubSub, Root, Subscription} from 'type-graphql'
import uuid from 'uuid'

const checkAuthorized = (context: any) => {
	if (!context.connection.context.authorized) {
		// doesn't work with schema stiching,
		// probably ok to wait till 1.0 and @Authorised support
		// https://github.com/MichalLytek/type-graphql/issues/175
		throw new Errors.Unathorized('Not authorised')
	}
}

export class NotificationResolver {
	@Subscription({
		topics: ({args, context, payload}) => {
			checkAuthorized(context)
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
