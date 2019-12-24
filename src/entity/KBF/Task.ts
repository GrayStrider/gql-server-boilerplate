import {Field, ID, ObjectType} from 'type-graphql'
import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from 'typeorm'

@ObjectType()
@Entity()
export class Task extends BaseEntity {
	@Field(() => ID)
	@PrimaryGeneratedColumn()
	id: number
	
	@Field()
	@Column()
	title: string
	
	@Field()
	@Column()
	description: string
	
}
