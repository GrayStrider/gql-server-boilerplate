import {ArgsType, Field} from 'type-graphql'
import {Contains} from 'class-validator'
import {ExampleEntity} from '@/DB/typeorm/examples'

@ArgsType()
export default class ExampleEntitySearchInput implements Partial<ExampleEntity> {
	
	@Field()
	
	/*
	 * Validating here only makes sense in cases where input args class doesn't implement an entity, since validation
	 * rules are alrady present in entity itself
	 */
	
	@Contains('123')
	validatedName: string
	
}
