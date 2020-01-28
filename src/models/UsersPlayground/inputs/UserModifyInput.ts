import {InputType, Field, Int} from 'type-graphql'
import {Countries} from '@/models/UsersPlayground'
import {IsValidEmail} from '@/models/UsersPlayground/lib'
import {UserCreateInput} from '@/models/UsersPlayground/inputs/index'

/** Same fields as in create, but all nullable */
@InputType()
export default class UserModifyInput implements UserCreateInput {
	
	@Field({nullable: true})
	firstName: string
	
	@Field({nullable: true})
	lastName: string
	
	@Field(returns => Countries, {nullable: true})
	country: Countries
	
	@IsValidEmail
	@Field({nullable: true})
	email: string
	
	@Field({nullable: true})
	password: string
	
	@Field(returns => Int, {nullable: true})
	age: number
	
	@Field(returns => [String], {defaultValue: []})
	friendsIds: string[]
	
}

