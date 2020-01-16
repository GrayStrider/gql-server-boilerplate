import {ObjectType, Field} from 'type-graphql'
import {Entity, ManyToOne, Column, ManyToMany} from 'typeorm'
import {TColumn as TColumn} from '@/models/KBF/entity/Helpers/TColumn'
import {Task} from '@/models/KBF/entity/Task'

@ObjectType()
@Entity()
export class TDate {
	
	@Field(returns => [Task], {nullable: true})
	@ManyToMany(type => Task, task => task.dates, {
		nullable: true
	})
	tasks: Task[]
	
	@Field(returns => TColumn)
	@ManyToOne(type => TColumn)
	targetColumn: TColumn
	
	@Column({default: 'active'})
	@Field()
	status: 'active'
	
	@Column({default: 'dueDate'})
	@Field()
	dateType: 'dueDate'
	
	@Column({type: 'date', nullable: true})
	@Field(returns => Date, {nullable: true})
	dueTimestamp?: Date
	
	@Column({type: 'date', nullable: true})
	@Field(returns => Date, {nullable: true})
	dueTimestampLocal?: string
}

