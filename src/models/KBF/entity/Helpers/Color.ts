import {registerEnumType, ObjectType, Field} from 'type-graphql'
import {Entity, ManyToMany, OneToMany, Column, ManyToOne} from 'typeorm'
import {Task} from '@/models/KBF/entity/Task'
import {Board} from '@/models/KBF/entity/Board'

export enum Colors{YELLOW = 'YELLOW', WHITE = 'WHITE', RED = 'RED', GREEN = 'GREEN', BLUE = 'BLUE', PURPLE = 'PURPLE', ORANGE = 'ORANGE', CYAN = 'CYAN', BROWN = 'BROWN', MAGENTA = 'MAGENTA'}

registerEnumType(Colors, {
	name: 'Colors'
})

@Entity()
@ObjectType()
export class Color {
	@Field(returns => [Task], {nullable: true})
	@OneToMany(type => Task, task => task.color)
	tasks: Task[]
	
	@Field()
	@Column({length: 255})
	name: string
	
	@Field({nullable: true})
	@Column({length: 5000, nullable: true})
	description?: string;
	
	@Field(returns => Colors)
	@Column({type: 'enum', enum: Colors, default: Colors.WHITE})
	value: Colors
	
	@ManyToOne(type => Board, board => board.colors)
	board: Board
}
