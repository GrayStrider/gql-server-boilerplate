import {ObjectType, Field, ID} from 'type-graphql'
import {Entity, OneToOne, Column, BaseEntity, PrimaryGeneratedColumn} from 'typeorm'
import {Task} from '@/models/KBF/entity/main/Task'

@ObjectType()
@Entity()
export class Number extends BaseEntity{
	@Field(returns => ID)
	@PrimaryGeneratedColumn('uuid')
	id: string
	
	@Field()
	@Column()
	value: number
	
	@Field()
	@Column()
	prefix?: string
	
	@OneToOne(type => Task)
	task: Task
}
