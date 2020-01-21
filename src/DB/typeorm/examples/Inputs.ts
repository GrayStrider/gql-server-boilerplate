import {Contains} from 'class-validator'
import {ArgsType, Field} from 'type-graphql'
import {Category} from './Adjacency list'
import {ExampleEntity} from './entity/Entity'

@ArgsType()
export class ListsInput implements Partial<Category> {

	description: string

	name: string

}

@ArgsType()
export class ExampleEntitySearchInput implements Partial<ExampleEntity> {

	@Field()

	/*
	 * Validating here only makes sense in cases where input args class doesn't implement an entity, since validation
	 * rules are alrady present in entity itself
	 */
	
	@Contains('123')
	validatedName: string

}

@ArgsType()
export class ExampleEntityNewInput implements Partial<ExampleEntity> {

	@Field()
	validatedName: string

	@Field()
	manyOptions: string

}
