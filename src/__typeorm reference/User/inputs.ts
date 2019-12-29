import {ArgsType, Field} from 'type-graphql'
import {User} from '../../entity/User'
import {UserNew} from '../entity/User'
import {Countries} from './CountriesList'

@ArgsType()
export class UserCreateInput implements Partial<UserNew> {
	@Field()
	firstName: string
	
	@Field({nullable: true})
	lastName: string
	
	@Field(returns => Countries)
	country: Countries
	
	@Field()
	email: string
	
	@Field()
	password: string
	
	@Field()
	age: number
}

@ArgsType()
export class UserSearchInput implements Partial<User> {
	@Field({nullable: true})
	firstName: string
	
	@Field({nullable: true})
	lastName: string
	
	@Field({nullable: true})
	age: number
	
	@Field(returns => Countries, {nullable: true})
	country: Countries
	
	@Field({nullable: true})
	email: string
}
