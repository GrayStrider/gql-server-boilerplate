import {Field, ObjectType} from 'type-graphql'

@ObjectType()
export class SimpleJSONObjectTypeInterface {

	@Field()
	name: string

	@Field()
	age: number

}
