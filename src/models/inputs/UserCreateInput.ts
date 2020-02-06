import {InputType, Field, Int} from 'type-graphql'
import {Min, Max, IsInt} from 'class-validator'
import {Countries} from '@/models'
import {IsValidEmail, UserCreateType} from '@/models/lib'

@InputType()
export default class UserCreateInput implements UserCreateType {
	
	@Field()
	firstName: string
	
	@Field({nullable: true})
	lastName: string
	
	@Field(returns => Countries)
	country: Countries
	
	@IsValidEmail
	@Field()
	email: string
	
	@Field()
	password: string
	
	@Min(18)
	@Max(150)
	@IsInt()
	@Field(returns => Int)
	age: number
	
	@Field(returns => [String], {nullable: true})
	friendsIds: string[]
	
}

