import {PrimaryGeneratedColumn, Column, ManyToMany, Entity, BaseEntity} from 'typeorm'
import {Field, ObjectType, ID} from 'type-graphql'
import {Task} from './Task'

@ObjectType()
@Entity()
export class Label extends BaseEntity {

	@Field(returns => ID)
	@PrimaryGeneratedColumn('uuid')
	id: string

	@Field()
	@Column()
	name: string

	@Field()
	@Column({type: 'bool',
		default: false})
	pinned: boolean

	@Field(returns => [Task])
	@ManyToMany(type => Task, task => task.labels)
	tasks: Task[]

}
