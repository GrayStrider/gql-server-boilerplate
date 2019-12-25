import {Field, ID, ObjectType} from 'type-graphql'
import {BaseEntity, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, RelationId} from 'typeorm'
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
	
	@Field()
	@Column({type: 'bool', default: false})
	completed: boolean
	
	@Field(returns => [Tag], {nullable: true})
	@ManyToMany(type => Tag, tag => tag.tasks)
	@JoinTable()
	tags: Tag[]
}
