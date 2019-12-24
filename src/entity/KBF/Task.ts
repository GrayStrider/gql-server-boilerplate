import {Field, ID, ObjectType} from 'type-graphql'
import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from 'typeorm'

/*
 export interface ITask {
 id: string
 title: string
 description: string
 }
 */

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
	
	@Field()
	@Column({type: 'bool', default: false})
	completed: boolean
}
