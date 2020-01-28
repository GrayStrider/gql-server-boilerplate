import {Field, ID, ObjectType} from 'type-graphql'

@ObjectType()
export default class Notification {
	
	@Field(type => ID)
	id: string
	
	@Field({nullable: true})
	message?: string
	
	@Field(type => Date)
	date: Date
	
}

