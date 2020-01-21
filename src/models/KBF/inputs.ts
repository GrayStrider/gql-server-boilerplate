import {Max} from 'class-validator'
import {ArgsType, Field} from 'type-graphql'
import {Priority} from '@/models/KBF/entity/Priority'

@ArgsType()
export class NewTaskInput {

	@Field({defaultValue: ''})
	title: string

	@Field({nullable: true})
	description: string

	@Field(returns => [String], {nullable: true})
	tags: string[]
	
	// TODO check for dupes
	@Field(returns => Priority, {defaultValue: Priority.NONE})
	priority: Priority

	@Field({defaultValue: '1234567'})
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
