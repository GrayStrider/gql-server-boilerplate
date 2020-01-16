import {PrimaryGeneratedColumn, Column, ManyToMany} from 'typeorm'
import {Field} from 'type-graphql'
import {Task} from '@/models/KBF/entity/Task'

export class Label {
	@Field()
	@PrimaryGeneratedColumn('uuid')
	id: string
	
	@Field()
	@Column()
	name: string
	
	@Field()
	@Column({type: 'bool', default: false})
	pinned: boolean
	
	@Field(returns => [Task])
	@ManyToMany(type => Task, task => task.labels)
	tasks: Task[]
}
