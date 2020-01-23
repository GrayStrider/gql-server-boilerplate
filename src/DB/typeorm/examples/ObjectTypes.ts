import {Field, ObjectType} from 'type-graphql'

@ObjectType()
class SimpleJSONObjectTypeInterface {
	
	@Field()
	name: string
	
	@Field()
	age: number
	
}

export default SimpleJSONObjectTypeInterface
