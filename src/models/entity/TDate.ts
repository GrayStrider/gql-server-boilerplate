import {ObjectType, Field, ID} from 'type-graphql'
import {Entity, ManyToOne, Column, ManyToMany, BaseEntity, PrimaryGeneratedColumn} from 'typeorm'
import {TColumn, Task} from '@/models'

@ObjectType()
@Entity()
class TDate extends BaseEntity {
	
	@Field(returns => ID)
	@PrimaryGeneratedColumn('uuid')
	id: string
	
	@Field(returns => [Task], {nullable: true})
	@ManyToMany(type => Task, task => task.dates, {
		nullable: true,
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

export default TDate
