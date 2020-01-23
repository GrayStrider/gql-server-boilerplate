import {Field, ID, ObjectType} from 'type-graphql'
import {BaseEntity, Column, PrimaryGeneratedColumn} from 'typeorm'

@ObjectType()
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
	@Column({default: 'value'})
	embedded1: string
	
	@Field()
	@Column({default: 'value'})
	embedded2: string
	
	
}
