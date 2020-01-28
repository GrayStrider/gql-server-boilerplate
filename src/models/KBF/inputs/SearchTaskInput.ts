import {ArgsType, Field} from 'type-graphql'
import {Max} from 'class-validator'

@ArgsType()
export default class SearchTaskInput {
	
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

