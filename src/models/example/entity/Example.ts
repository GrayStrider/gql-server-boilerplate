import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from 'typeorm'
import {ObjectType, Field, ID} from 'type-graphql'

@ObjectType()
@Entity()
export default class Example extends BaseEntity {

	@PrimaryGeneratedColumn('uuid')
	@Field(returns => ID)
	id: string
	
	@Column({default: 'exampleValue'})
	@Field()
	property: string

}
