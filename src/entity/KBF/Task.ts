import {MaxLength} from 'class-validator'
import {Field, ID, Int, ObjectType} from 'type-graphql'
import {BaseEntity, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn} from 'typeorm'
import {Priority} from './Priority'
import {Tag} from './Tag'


@ObjectType()
@Entity()
export class Task extends BaseEntity/* implements ITask*/ {
	@Field(() => ID)
	@PrimaryGeneratedColumn('uuid')
	id: string
	
	@Field()
	@Column({length: 100})
	title: string
	
	@Field()
	@Column({length: 1000, nullable: true})
	description: string
	
	@Field(returns => Priority)
	@Column({type: 'enum', enum: Priority, default: Priority.NONE})
	priority: Priority
	
	@Field()
	@Column({type: 'bool', default: false})
	completed: boolean
	
	@Field(returns => [Tag], {defaultValue: []})
	@ManyToMany(type => Tag, tag => tag.tasks, {
		// cascading does not create a tag when task query errored
		cascade: true,
		// no need to specify the relation when using find()
		eager: true
	})
	@JoinTable()
	tags: Tag[]
	
	@Field(returns => Date)
	@CreateDateColumn()
	createdAt: Date
	
	@Field(returns => Date)
	@UpdateDateColumn()
	updatedAt: Date
	
	@Field(returns => Int)
	@VersionColumn({default: 0})
	version: number
	
	@Field()
	@Column({length: 10, nullable: true})
	@MaxLength(10)
	constrained: string
}

