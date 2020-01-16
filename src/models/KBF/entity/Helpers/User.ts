import {PrimaryGeneratedColumn, ManyToMany, OneToMany} from 'typeorm'
import {Task} from '@/models/KBF/entity/Task'
import {Field} from 'type-graphql'
import {Subtask} from '@/models/KBF/entity/Helpers/Subtask'
import {Comment} from '@/models/KBF/entity/Helpers/Comment'

export class User {
	
	@PrimaryGeneratedColumn('uuid')
	@Field()
	id: string
	
	@Field(returns => [Task])
	@ManyToMany(type => Task)
	tasks: Task[]
	
	@Field(returns => [Subtask])
	@ManyToMany(type => Subtask)
	subtasks: Subtask[]
	
	@Field(returns => [Task])
	@ManyToMany(type => Task, task => task.collaborators)
	collaboratingAt: Task[]
	
	@Field(returns => [Comment])
	@OneToMany(type => Comment, comm => comm.author)
	comments: Comment[]
	
}
