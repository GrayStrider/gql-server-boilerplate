import {Contains, Length, MaxLength} from 'class-validator'
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
// Entity
//================================================================================

@ObjectType()
@Entity()
export class ExampleEntity extends BaseEntity {
	
	@Field(returns => ID)
	// @PrimaryColumn()
	@PrimaryGeneratedColumn()
	id: number
	
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
		type: 'varchar',
		length: 30,
		unique: true
	})
	manyOptions: string
	
}

