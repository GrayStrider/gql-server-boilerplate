import {GraphQLEnumValue, GraphQLField} from 'graphql'
import {Directive, Field, ID, ObjectType, Root} from 'type-graphql'
import {BaseEntity, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn} from 'typeorm'
import {Countries} from '../lib/CountriesList'
import {howCommonIsName} from '../lib/HowCommonName'


const UserDescription = `Unique user ID.
This field suppports **formatting** and [links](https://google.com).`

@ObjectType()
@Entity()
export class UserNew extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	@Field(returns => ID, {description: UserDescription})
	id: string
	
	@Field()
	@Column()
	firstName: string
	
	@Field()
	@Column({nullable: true})
	lastName: string
	
	@Field()
	@Column({type: 'text', unique: true})
	email: string
	
	@Field()
	@Column()
	password: string
	
	@Field()
	@Column('int')
	age: number
	
	@CreateDateColumn()
	@Field()
	createdDate: string
	@Field(returns => Countries)
	@Column({type: 'enum', enum: Countries})
	country: Countries
	@JoinTable()
	@ManyToMany(type => UserNew, friends => friends.friendsInverse, {cascade: ['insert', 'update']})
		// @Field(returns => [UserNew], {nullable: true})
	friendsPrimary: UserNew[]
	// @Field(returns => [UserNew])
	@ManyToMany(type => UserNew, friends => friends.friendsPrimary)
	friendsInverse: UserNew[]
	
	@Directive('@deprecated(reason: "Use `newField`.")') //TODO does nothing?
	@Field()
	deprecated: string
	
	@Field(returns => String)
	async howCommonIsName() {
		return await howCommonIsName(this.firstName, this.lastName)
	}
	
	@Field({complexity: 3})
	name(@Root() parent: UserNew): string {
		return `${parent.firstName}${parent.lastName ? ' ' + parent.lastName : ''}`
	}
	
	@Field(returns => [UserNew])
	friends(): UserNew[] {
		
		return [...(this.friendsPrimary ?? []), ...(this.friendsInverse ?? [])]
	}
	
}
