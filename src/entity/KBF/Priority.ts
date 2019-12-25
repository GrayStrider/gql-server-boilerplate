import {registerEnumType} from 'type-graphql'

export enum Priority {
	HIGH = 'high',
	MEDIUM = 'medium',
	LOW = 'low',
	NONE = 'none'
}

registerEnumType(Priority, {
	name: 'Priority'
})
