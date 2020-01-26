import {Arg, Mutation, Publisher, PubSub, Root, Subscription} from 'type-graphql'
import uuid from 'uuid'
import {isNil} from 'ramda'
import {Errors} from '@/utils'
import {Context} from '@/graphql'
import {NotificationPayload, SubTopics, Notification} from '@/models/UsersPlayground/subscriptions'

function checkAuthorized (context: Context) {
	
	/*
	 * Doesn't work with schema stiching,
	 * probably ok to wait till 1.0 and @Authorised support
	 * https://github.com/MichalLytek/type-graphql/issues/175
	 */
	
	if (isNil(context.session?.userId)) throw new Errors.Unathorized('Not authorised')
	
}

export default class NotificationResolver {
	
	@Subscription({
		topics: ({args, context, payload}) => {
			
			checkAuthorized(context)
			return SubTopics.NOTIFICATIONS
			
		},
		filter: ({payload, args, context, info}) => true,
	})
	newNotification (@Root() {id, message}: NotificationPayload): Notification {
		
		return {id, message, date: new Date()}
		
	}
	
	@Mutation(returns => Boolean)
	async ping (
	@Arg('message') message: string,
		@PubSub(SubTopics.NOTIFICATIONS) dispatch: Publisher<NotificationPayload>
	) {
		
		await dispatch({message, id: uuid()})
		return true
		
	}
	
}
