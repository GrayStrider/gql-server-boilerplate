import {registerEnumType} from 'type-graphql'

enum SubTopics {
	NOTIFICATIONS = 'NOTIFICATIONS'
}


registerEnumType(SubTopics, {
	name: 'SubTopics',
})

export default SubTopics
