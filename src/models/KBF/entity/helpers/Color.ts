import {ObjectType, Field} from 'type-graphql'
import {Entity, OneToMany, Column, ManyToOne, BaseEntity} from 'typeorm'
import {Board, Task, ColorValues} from '@/models/KBF/entity'


@ObjectType()
@Entity()
export class Color extends BaseEntity {
	// @Field(returns => [Task], {nullable: true})
	// @OneToMany(type => Task, task => task.color)
	// tasks: Task[]
	//
	// @Field()
	// @Column({length: 255})
	// name: string
	//
	// @Field({nullable: true})
	// @Column({length: 5000, nullable: true})
	// description?: string;
	//
	// @Field(returns => ColorValues)
	// @Column({type: 'enum', enum: ColorValues, default: ColorValues.WHITE})
	// value: ColorValues
	//
	// @ManyToOne(type => Board, board => board.colors)
	// board: Board
}
