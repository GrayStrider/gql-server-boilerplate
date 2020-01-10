import {LogAccess} from '@/graphql/type-graphql/middleware/LogAccess'
import {UserModifyInput} from '@/models/UsersPlayground/inputs'
import {Directive, Field, ID, Int, ObjectType, Root, UseMiddleware} from 'type-graphql'
import {
	BaseEntity, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm'
import {Countries} from '../lib/CountriesList'
import {howCommonIsName} from '../lib/HowCommonName'

const currentYear = new Date().getFullYear()
const UserDescription = `Unique user ID.
This field suppports **formatting** and [links](https://google.com).`



@ObjectType()
@Entity()
export class UserNew extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	@Field(returns => ID, {description: UserDescription})
	readonly id: string
	
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
	
	@Field(returns => Int)
	age() {
		return currentYear - this.yearBorn
	}
	
	@Column('int')
	yearBorn: number
	
	@CreateDateColumn()
	@Field()
	readonly createdDate: Date;
	
	@Field()
	@UpdateDateColumn()
	updatedDate: Date;
	
	@Field(returns => Countries)
	@Column({type: 'enum', enum: Countries})
	
	country: Countries
	@JoinTable()
	@ManyToMany(type => UserNew, friends => friends.friendsInverse, {cascade: ['insert', 'update']})
	
	friendsPrimary: UserNew[]
	@ManyToMany(type => UserNew, friends => friends.friendsPrimary)
	friendsInverse: UserNew[]
	
	@Directive('@deprecated(reason: "Use `newField`.")') //TODO does nothing?
	@Field()
	deprecated: string
	
	@Field(returns => String, {complexity: 3})
	async howCommonIsName() {
		return await howCommonIsName(this.firstName, this.lastName)
	}
	
	@Field({complexity: 2})
	@UseMiddleware(LogAccess)
	name(@Root() parent: UserNew): string {
		return `${parent.firstName}${parent.lastName ? ' ' + parent.lastName : ''}`
	}
	
	@Field(returns => [UserNew], {complexity: 2})
	friends(): UserNew[] {
		
		return [...(this.friendsPrimary ?? []), ...(this.friendsInverse ?? [])]
	}
	
}
