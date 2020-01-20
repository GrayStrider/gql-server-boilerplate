import {ObjectType, Field, ID} from 'type-graphql'
import {Entity, OneToMany, Column, ManyToOne, BaseEntity, PrimaryGeneratedColumn} from 'typeorm'
import {ColorValues} from '@/models/KBF/entity/index'
import {Task} from './Task'
// Have to be separate, probably something to do with loading order or something.
import {Board} from './Board'


@ObjectType()
@Entity()
export class Color extends BaseEntity {

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
	@Column({length: 5000,
		nullable: true})
	description?: string;

	@Field(returns => ColorValues)
	@Column({type: 'enum',
		enum: ColorValues,
		default: ColorValues.WHITE})
	value: ColorValues

	@ManyToOne(type => Board, board => board.colors)
	board: Board

}
