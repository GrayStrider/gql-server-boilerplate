import {Max} from 'class-validator'
import {ArgsType, Field} from 'type-graphql'
import {Priority} from './entity/Priority'

@ArgsType()
export class NewTaskInput {
	@Field({defaultValue: "New Task"})
	title: string
	
	// on field nullable only applicable in the context of inputs
	@Field({nullable: true})
	description: string
	
	@Field(returns => [String], {nullable: true})
	tags: string[]
	
	@Field(returns => Priority, {defaultValue: Priority.NONE}) //TODO check for dupes
	priority: Priority
	
	@Field({defaultValue: "1234567"})
	constrained: string
	
}

@ArgsType()
export class SearchTaskInput {
	@Field({nullable: true})
	@Max(100)
	title: string
	
	@Field({nullable: true})
	description: string
	
	@Field({nullable: true})
	id: string
	
	@Field({nullable: true})
	completed: boolean
	
	@Field(returns => [String], {nullable: true})
	tag: string
}
