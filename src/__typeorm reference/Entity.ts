import {Field, Int, InterfaceType, ObjectType} from 'type-graphql'
import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from 'typeorm'


//================================================================================
// Helpers
//================================================================================

@ObjectType()
class SimpleJSONObjectTypeInterface {
	@Field()
	name: string
	
	@Field()
	age: number
}

//================================================================================
// Entity
//================================================================================

@ObjectType()
@Entity()
export class ExampleEntity extends BaseEntity {
	
	@Field()
	// @PrimaryColumn()
	@PrimaryGeneratedColumn()
	id: number
	
	@Field()
	// @PrimaryColumn() // you can have several
	@Column()
	name: string
	
	@Field()
	@Column()
	isActive: boolean
	
	// don't use simple-array
	// note the default syntax
	// or use enums
	@Field(returns => [Int])
	@Column('int', {array: true, default: '{1, 2, 3}'})
	array: number[]
	
	@Field(returns => SimpleJSONObjectTypeInterface)
	@Column('simple-json', {default: {name: "Ivan", age: 24}})
	json: { name: string, age: number }
}

