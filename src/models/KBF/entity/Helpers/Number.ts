import {ObjectType, Field} from 'type-graphql'
import {Entity, OneToOne, Column} from 'typeorm'
import {Task} from '@/models/KBF/entity/Task'

@ObjectType()
@Entity()
export class Number {
	
	@Field()
	@Column()
	value: number
	
	@Field()
	@Column()
	prefix?: string
	
	@OneToOne(type => Task)
	task: Task
}
