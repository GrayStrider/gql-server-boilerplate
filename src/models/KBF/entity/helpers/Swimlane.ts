import {Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne, BaseEntity} from 'typeorm'
import {Task} from '@/models/KBF/entity/main/Task'
import {Board} from '@/models/KBF/entity/main/Board'
import {Field, ID, ObjectType} from 'type-graphql'

@ObjectType()
@Entity()
export class Swimlane extends BaseEntity {
	@Field(returns => ID)
	@PrimaryGeneratedColumn('uuid')
	id: string
	
	
	@Field(returns => [Task])
	@OneToMany(type => Task, task => task.swimlane)
	tasks: Task[]
	
	@Field(returns => Board)
	@ManyToOne(type => Board, board => board.swimlanes)
	board: Board
}
