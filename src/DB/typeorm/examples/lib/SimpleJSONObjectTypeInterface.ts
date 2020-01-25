import {ObjectType, Field} from 'type-graphql'

@ObjectType()
export default class SimpleJSONObjectTypeInterface {
	
	@Field()
	name: string
	
	@Field()
	age: number
	
}
