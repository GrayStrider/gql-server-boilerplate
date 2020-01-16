import {Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne} from 'typeorm'
import {Task} from '@/models/KBF/entity/Task'
import {Board} from '@/models/KBF/entity/Board'


@Entity()
export class Swimlane{
	@PrimaryGeneratedColumn('uuid')
	id: string
	
	@OneToMany(type => Task, task => task.swimlane)
	tasks: Task[]
	
	@ManyToOne(type => Board, board => board.swimlanes)
	board: Board
}
