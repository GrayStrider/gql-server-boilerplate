import {InputType, Field, Int} from 'type-graphql'
import UserModifyInput from '@/models/UsersPlayground/inputs/UserModifyInput'
import {IsValidEmail} from '@/models/UsersPlayground/lib'
import {Countries} from '@/models/UsersPlayground'

/**
 * Omit certain fields in search
 */
@InputType()
export default class UserSearchInput implements Omit<UserModifyInput, 'password' | 'friendsIds'> {
	
	[key: string]: unknown;
	
	@Field({nullable: true})
	id: string
	
	@IsValidEmail
	@Field({nullable: true})
	email: string
	
	@Field({nullable: true})
	firstName: string
	
	@Field({nullable: true})
	lastName: string
	
	@Field(returns => Countries, {nullable: true})
	country: Countries
	
	@Field(returns => Int, {nullable: true})
	age: number
	
}

