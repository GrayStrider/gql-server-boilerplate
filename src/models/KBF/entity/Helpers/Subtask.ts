import {ObjectType, Field} from 'type-graphql'
import {Entity, Column, ManyToMany, ManyToOne, JoinTable} from 'typeorm'
import {User} from '@/models/KBF/entity/Helpers/User'
import {Task} from '@/models/KBF/entity/Task'

@ObjectType()
@Entity()
export class Subtask {
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
