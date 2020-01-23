import {registerEnumType} from 'type-graphql'

enum Priority {
	HIGH = 'HIGH',
	MEDIUM = 'MEDIUM',
	LOW = 'LOW',
	NONE = 'NONE'
}

registerEnumType(Priority, {
	name: 'Priority',
})

export {Priority}
