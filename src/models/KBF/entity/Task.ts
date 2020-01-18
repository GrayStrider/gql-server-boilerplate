import {Field, ID, ObjectType} from 'type-graphql'
import {BaseEntity, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn, ManyToOne, OneToOne, OneToMany} from 'typeorm'
import {Swimlane, TDate, Subtask, TColumn, Color, Label, User, Comment, Number} from '@/models/KBF/entity/index'


@ObjectType()
@Entity()
export class Task extends BaseEntity/* implements ITask*/ {
	@Field(() => ID)
	@PrimaryGeneratedColumn('uuid')
	_id: string
	
	@Field()
	@Column({length: 255})
	name: string
	
	@Field()
	@Column({length: 5000, nullable: true})
	description: string
	
	@Field(returns => Color)
	@ManyToOne(type => Color, color => color.tasks)
	color: Color
	
	@Field(returns => TColumn)
	@ManyToOne(type => TColumn)
	column: TColumn
	
	@Column()
	@Field()
	totalSecondsSpent: number
	
	@Column({nullable: true})
	@Field({nullable: true})
	totalSecondsEstimate?: number
	
	@Column({nullable: true})
	@Field({nullable: true})
	pointsEstimate?: number
	
	@Field(returns => Swimlane)
	@ManyToOne(type => Swimlane, {nullable: true})
	swimlane: Swimlane
	
	@Column()
	@Field()
	position: number
	
	@OneToOne(type => Number, {nullable: true})
	@Field(returns => Number, {nullable: true})
	number: Number
	
	@Field(returns => User, {nullable: true})
	@ManyToMany(type => User, user => user.tasks, {nullable: true})
	@JoinTable()
	responsibleUser: User
	
	@ManyToMany(type => TDate, date => date.tasks, {nullable: true})
	@Field(returns => [TDate], {nullable: true})
	dates?: TDate[]
	
	
	@OneToMany(type => Subtask,
		subtask => subtask.parent)
	@Field(returns => [Subtask], {nullable: true})
	subtasks?: Subtask[]
	
	@Field(returns => [Label])
	@ManyToMany(type => Label, Label => Label.tasks, {
		cascade: true,
		eager: true,
	})
	@JoinTable()
	labels: Label[]
	
	@ManyToMany(type => User,
		user => user.collaboratingAt)
	@Field(returns => [User])
	collaborators: User[]
	
	@Field(returns => Date)
	@CreateDateColumn()
	createdAt: Date
	
	@Field(returns => Date)
	@UpdateDateColumn()
	updatedAt: Date
	
	@Field(returns => Comment, {nullable: true})
	@OneToMany(type => Comment, comm => comm.task)
	comments: Comment
}

