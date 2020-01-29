import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from 'typeorm'
import {ObjectType, Field, ID, UseMiddleware} from 'type-graphql'
import LogAccess from '@/graphql/type-graphql/middleware/LogAccess'

@ObjectType()
@Entity()
export default class Example extends BaseEntity {

	@PrimaryGeneratedColumn('uuid')
	@Field(returns => ID)
	id: string
	
	@UseMiddleware(LogAccess)
	@Column({default: 'exampleValue'})
	@Field()
	property: string

}
