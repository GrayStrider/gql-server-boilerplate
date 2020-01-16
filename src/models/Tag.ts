import {Field, ID, ObjectType} from 'type-graphql'
import {BaseEntity, Column, Entity, ManyToMany, PrimaryGeneratedColumn} from 'typeorm'
import {Task} from 'src/models/KBF/entity/Task'

@ObjectType()
@Entity()
export class Tag extends BaseEntity {
	@Field(returns => ID)
	@PrimaryGeneratedColumn('uuid')
	id: string
	
	@Field()
	@Column({length: 15})
	title: string
	
	@Field()
	@Column({length: 100, nullable: true})
	description: string
	
	@Field(returns => [Task])
	@ManyToMany(type => Task, task => task.tags)
	tasks: Task[]
}

export class TagInput implements Partial<Tag> {
	@Field()
	title: string
	
	@Field({nullable: true})
	description: string
}
