import {ObjectType, Field, ID} from 'type-graphql'
import {Entity, Column, ManyToMany, ManyToOne, JoinTable, BaseEntity, PrimaryGeneratedColumn} from 'typeorm'
import {User, Task} from '@/models/KBF'

@ObjectType()
@Entity()
export default class Subtask extends BaseEntity {
	
	@Field(returns => ID)
	@PrimaryGeneratedColumn('uuid')
	id: string
	
	
	@Field()
	@Column()
	name: string
	
	@Field()
	@Column({type: 'bool', default: false})
	finished: boolean
	
	@Field(returns => Date, {nullable: true})
	@Column({type: 'date', nullable: true})
	dueDateTimestamp?: string
	
	@Field(returns => Date, {nullable: true})
	@Column({type: 'date', nullable: true})
	dueDateTimestampLocal?: string
	
	@Field(returns => [User], {nullable: true})
	@ManyToMany(type => User, user => user.subtasks)
	@JoinTable()
	user?: User[]
	
	@Field(returns => Task)
	@ManyToOne(type => Task)
	parent: Task
	
}

