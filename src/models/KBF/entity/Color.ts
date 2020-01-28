import {ObjectType, Field, ID} from 'type-graphql'
import {Entity, OneToMany, Column, ManyToOne, BaseEntity, PrimaryGeneratedColumn} from 'typeorm'
// Have to be separate, probably something to do with loading order or something.
import Board from './Board'
import {Task} from '@/models/KBF'
import {Colors} from '@/models/KBF/enums'


@ObjectType()
@Entity()
export default class Color extends BaseEntity {
	
	@Field(returns => ID)
	@PrimaryGeneratedColumn('uuid')
	id: string
	
	@Field(returns => [Task], {nullable: true})
	@OneToMany(type => Task, task => task.color)
	tasks: Task[]
	
	@Field()
	@Column({length: 255})
	name: string
	
	@Field({nullable: true})
	@Column({length: 5000, nullable: true})
	description?: string
	
	@Field(returns => Colors)
	@Column({type: 'enum', enum: Colors, default: Colors.WHITE})
	value: Colors
	
	@ManyToOne(type => Board, board => board.colors)
	board: Board
	
}

