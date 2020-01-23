import {registerEnumType} from 'type-graphql'

export enum SubTopics {
	NOTIFICATIONS = 'NOTIFICATIONS'
}


registerEnumType(SubTopics, {
	name: 'SubTopics',
})
