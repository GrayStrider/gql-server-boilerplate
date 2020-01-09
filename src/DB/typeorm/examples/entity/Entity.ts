import {Contains, MaxLength} from 'class-validator'
import {Field, Int, ObjectType} from 'type-graphql'
import {Column, Entity, Generated, OneToMany} from 'typeorm'
import {Child} from './ChildEntity'
import {EmbeddedFeatures, GenericFeatures} from './GenericFeaturesEntity'
import {SimpleJSONObjectTypeInterface} from '../ObjectTypes'



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
		// unique  : true,
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
	
	@Field(returns => [Child], {nullable: true})
	@OneToMany(type => Child, child => child.parent, {
		cascade: true,
		eager: true
	})
	children: Child[]
	
}
