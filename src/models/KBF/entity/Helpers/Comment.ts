import {PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn} from 'typeorm'
import {Field, ID} from 'type-graphql'
import {User} from '@/models/KBF/entity/Helpers/User'
import {Task} from '@/models/KBF/entity/Task'

export class Comment {
	@Field()
	@Column({length: 5000})
	text: string
	
	@Field(returns => User)
	@ManyToOne(type => User, user => user.comments)
	author: string
	
	@Field(returns => Date)
	@CreateDateColumn()
	createdTimestamp: Date
	
	@Field(returns => Task)
	@ManyToOne(type => Task, task => task.comments)
	task: Task
}
