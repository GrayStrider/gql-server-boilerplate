import {registerEnumType} from 'type-graphql'

export enum SUB_TOPICS {
	NOTIFICATIONS = 'NOTIFICATIONS'
}


registerEnumType(SUB_TOPICS, {
	name: 'SUB_TOPICS',
})
