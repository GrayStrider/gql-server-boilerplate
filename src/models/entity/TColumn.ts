import {Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne, BaseEntity} from 'typeorm'
import {ObjectType, Field, ID} from 'type-graphql'
import {Task} from '@/models'
import Board from '@/models/entity/Board'


@Entity()
@ObjectType()
export default class TColumn extends BaseEntity {
	
	@Field(returns => ID)
	@PrimaryGeneratedColumn('uuid')
	id: string
	
	@Field(returns => Board)
	@ManyToOne(type => Board, board => board.columns)
	board: Board
	
	@Field(returns => Task, {nullable: true})
	@OneToMany(type => Task, task => task.column)
	tasks: Task[]
	
}

