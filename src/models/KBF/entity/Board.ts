import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from 'typeorm'
import {ObjectType, Field, ID} from 'type-graphql'
import {Swimlane, TColumn, Color} from '@/models/KBF/entity/index'

@ObjectType()
@Entity()
class Board {
	
	@PrimaryGeneratedColumn('uuid')
	@Field(returns => ID)
	id: string
	
	@Column({length: 255})
	@Field()
	name: string
	
	@OneToMany(type => TColumn, coll => coll.board)
	columns: TColumn[]
	
	@OneToMany(type => Color, color => color.board)
	colors: Color[]
	
	@OneToMany(type => Swimlane,
		swimlane => swimlane.board)
	swimlanes: Swimlane[]
	
}

export default Board
