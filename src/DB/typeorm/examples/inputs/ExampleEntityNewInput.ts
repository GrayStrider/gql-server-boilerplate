import {ArgsType, Field} from 'type-graphql'
import {ExampleEntity} from '@/DB/typeorm/examples'

@ArgsType()
export default class ExampleEntityNewInput implements Partial<ExampleEntity> {
	
	@Field()
	validatedName: string
	
	@Field()
	manyOptions: string
	
}
