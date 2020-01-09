import {GraphQLError} from 'graphql'
import {Arg, Field, ID, Mutation, ObjectType, Publisher, PubSub, registerEnumType, Root, Subscription} from 'type-graphql'
import uuid from 'uuid'
import {Errors} from '../../../utils/Errors'


export enum SUB_TOPICS {
	NOTIFICATIONS = 'NOTIFICATIONS'
}

registerEnumType(SUB_TOPICS, {
	name: 'SUB_TOPICS',
})

@ObjectType()
export class Notification {
	@Field(type => ID)
	id: string
	
	@Field({nullable: true})
	message?: string
	
	@Field(type => Date)
	date: Date
}

export interface NotificationPayload {
	id: string;
	message?: string;
}


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
			console.log('authorized')
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
