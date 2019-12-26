import {Contains, MaxLength} from 'class-validator'
import {Field, ID, Int, ObjectType} from 'type-graphql'
import {BaseEntity, Column, Entity, Generated, PrimaryGeneratedColumn} from 'typeorm'


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
// Inheritance, group common elements and extend
//================================================================================


export abstract class GenericFeatures extends BaseEntity {
	@Field(returns => ID)
	@PrimaryGeneratedColumn('uuid')
	id: string
}

/**
 * The other way to do it is to use embedded columns:
 */

@ObjectType()
export class EmbeddedFeatures {
	@Field()
	@Column({default: "value"})
	embedded1: string
	
	@Field()
	@Column({default: "value"})
	embedded2: string
	
	
}


//================================================================================
// Entity
//================================================================================

@ObjectType()
@Entity()
export class ExampleEntity extends GenericFeatures {
	
	@Field()
	// @PrimaryColumn() // you can have several
	@Column()
	@Contains('123')
	validatedName: string
	
	@Field()
	@Column({default: false})
	isActive: boolean
	
	// don't use simple-array
	// note the default syntax
	// or use enums
	@Field(returns => [Int])
	@Column('int', {array: true, default: '{1, 2, 3}'})
	array: number[]
	
	@Field(returns => SimpleJSONObjectTypeInterface)
	@Column('simple-json', {default: {name: 'Ivan', age: 24}})
	json: { name: string, age: number }
	
	@Field()
	@Column()
	@Generated('increment')
	autoIncrement: number
	
	@Field()
	@Column()
	@Generated('uuid')
	uuid: string
	
	@Field()
	@MaxLength(30)
	@Column({
		type    : 'varchar',
		// defaults to property name
		name    : 'customName',
		length  : 30,
		unique  : true,
		nullable: false,
		// same function as
		// @PrimaryGeneratedColumn
		primary : false,
		// hide from standart query
		select  : true,
		default : 'default value, if none specified',
		comment : 'comment for column'
	})
	manyOptions: string
	
	@Field(returns => EmbeddedFeatures)
	@Column(type => EmbeddedFeatures)
	embedded: EmbeddedFeatures
	
}
