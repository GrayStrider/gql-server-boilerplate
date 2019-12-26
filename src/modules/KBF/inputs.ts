import {Max} from 'class-validator'
import {ArgsType, Field} from 'type-graphql'
import {Priority} from '../../entity/KBF/Priority'

@ArgsType()
export class NewTaskInput {
	@Field()
	title: string
	
	// on field nullable only applicable in the context of inputs
	@Field({nullable: true})
	description: string
	
	@Field(returns => String, {nullable: true})
	tag: string
	
	@Field(returns => Priority, {defaultValue: Priority.NONE}) //TODO check for dupes
	priority: Priority
	
	@Field({nullable: true})
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
