import {Contains, MaxLength} from 'class-validator'
import {Field, Int, ObjectType} from 'type-graphql'
import {Column, Entity, Generated, OneToMany} from 'typeorm'
import {SimpleJSONObjectTypeInterface} from '../ObjectTypes'
import Child from './ChildEntity'
import {EmbeddedFeatures, GenericFeatures} from './GenericFeaturesEntity'


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
	
	/*
	 * Don't use simple-array
	 * Note the default syntax
	 * or use enums
	 */
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
		// Defaults to property name
		name: 'customName',
		length: 30,
		// Unique  : true,
		nullable: false,
		
		/*
		 * Same function as
		 * @PrimaryGeneratedColumn
		 */
		primary: false,
		// Hide from standart query
		select: true,
		default: 'default value, if none specified',
		comment: 'comment for column',
	})
	manyOptions: string
	
	@Field(returns => EmbeddedFeatures)
	@Column(type => EmbeddedFeatures)
	embedded: EmbeddedFeatures
	
	@Field(returns => [Child], {nullable: true})
	@OneToMany(type => Child, child => child.parent, {
		cascade: true,
		eager: true,
	})
	children: Child[]
	
}
