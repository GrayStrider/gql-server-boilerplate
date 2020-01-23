import {InputType, Field} from 'type-graphql'
import {UserCreateInput} from '@/models/UsersPlayground/inputs/index'
import {IsValidEmail} from '@/models/UsersPlayground/lib'

@InputType()
export default class UserLoginInput implements Pick<UserCreateInput, 'email' | 'password'> {
	
	@Field()
	@IsValidEmail
	email: string
	
	@Field()
	password: string
	
}

