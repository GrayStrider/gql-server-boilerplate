import {Field, ID, ObjectType} from 'type-graphql'
import {BaseEntity, Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn} from 'typeorm'

@Entity()
@ObjectType()
export class User1 extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	@Field(returns => ID)
	id: string
	
	@Column()
	@Field()
	name: string
	
	@ManyToMany(type => User1)
	@Field(returns => [User1])
	friends: User1[]
	
}
