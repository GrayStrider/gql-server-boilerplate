import {Directive, Field, ID, Int, ObjectType, Root} from 'type-graphql'
import {BaseEntity, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm'
import {Countries} from '../lib/CountriesList'
import {howCommonIsName} from '../lib/HowCommonName'
import {isEmpty} from 'ramda'

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
	
	@Column('int')
	yearBorn: number
	
	@CreateDateColumn()
	@Field()
	readonly createdDate: Date
	
	@Field()
	@UpdateDateColumn()
	updatedDate: Date
	
	@Field(returns => Countries)
	@Column({type: 'enum', enum: Countries})
	country: Countries

	@JoinTable()
	@ManyToMany(type => UserNew, friends => friends.friendsInverse, {cascade: ['insert', 'update']})
	
	friendsPrimary?: UserNew[]
	
	@ManyToMany(type => UserNew, friends => friends.friendsPrimary)
	friendsInverse?: UserNew[]
	
	// TODO does nothing?
	@Directive('@deprecated(reason: "Use `newField`.")')
	@Field()
	deprecated: string
	
	@Field(returns => Int)
	age () {
		
		return currentYear - this.yearBorn
		
	}
	
	@Field(returns => String, {complexity: 3})
	async howCommonIsName () {
		
		return howCommonIsName(this.firstName, this.lastName)
		
	}
	
	@Field({complexity: 2})
	// @UseMiddleware(LogAccess)
	name (@Root() parent: UserNew): string {
		
		return `${parent.firstName}${isEmpty(parent.lastName) ? ` ${parent.lastName}` : ''}`
		
	}
	
	@Field(returns => [UserNew], {complexity: 2})
	friends (): UserNew[] {
		
		return [...this.friendsPrimary ?? [], ...this.friendsInverse ?? []]
		
	}
	
}
