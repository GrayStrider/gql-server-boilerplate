import {PrimaryGeneratedColumn, ManyToMany, OneToMany, Entity, BaseEntity} from 'typeorm'
import {Field, ObjectType, ID} from 'type-graphql'
import {Subtask, Comment, Task} from '@/models/KBF/entity/index'


@ObjectType()
@Entity()
class User extends BaseEntity {
	
	@Field(returns => ID)
	@PrimaryGeneratedColumn('uuid')
	id: string
	
	@Field(returns => [Task])
	@ManyToMany(type => Task)
	tasks: Task[]
	
	@Field(returns => [Subtask])
	@ManyToMany(type => Subtask)
	subtasks: Subtask[]
	
	@Field(returns => [Task])
	@ManyToMany(type => Task, task => task.collaborators)
	collaboratingAt: Task[]
	
	@Field(returns => [Comment])
	@OneToMany(type => Comment, comm => comm.author)
	comments: Comment[]
	
}

export default User
