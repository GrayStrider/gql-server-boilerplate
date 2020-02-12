import {ArgsType, Field} from 'type-graphql'
import Priority from '@/models/entity/Priority'

@ArgsType()
export default class NewTaskInput {
	
	@Field({defaultValue: ''})
	title: string
	
	@Field({nullable: true})
	description: string
	
	@Field(returns => [String], {defaultValue: []})
	tags: string[]
	
	// TODO check for dupes
	@Field(returns => Priority, {defaultValue: Priority.NONE})
	priority: Priority
	
	@Field({defaultValue: '1234567'})
	constrained: string
	
}

