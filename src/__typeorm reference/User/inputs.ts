import {IsEmail} from 'class-validator'
import {ArgsType, Field, InputType} from 'type-graphql'
import {UserNew} from '../entity/User'
import {Countries} from './CountriesList'

/**
 * @InputType will generate a real GraphQLInputType type and should be used when we need a nested object in the args:

updateItem(data: UpdateItemInput!): Item!
@ArgsType is virtual and it will be flattened in schema:

updateItem(id: Int!, userId: Int!): Item!
 TODO difference
 */

@InputType()
export class UserCreateInput implements Partial<UserNew> {
	@Field()
	firstName: string
	
	@Field({nullable: true})
	lastName: string
	
	@Field(returns => Countries)
	country: Countries
	
	@IsEmail({}, {message: "Invalid email format"})
	@Field()
	email: string
	
	@Field()
	password: string
	
	@Field()
	age: number
}

@InputType()
export class UserModifyInput implements UserCreateInput {
	@Field({nullable: true})
	firstName: string
	
	@Field({nullable: true})
	lastName: string
	
	@Field(returns => Countries, {nullable: true})
	country: Countries
	
	@IsEmail({}, {message: "Invalid email format"})
	@Field({nullable: true})
	email: string
	
	@Field({nullable: true})
	password: string
	
	@Field({nullable: true})
	age: number
	
}

@InputType()
export class UserSearchInput implements Partial<UserNew> {
	[key: string]: any;
	
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

@InputType()
export class UserSearchInputSimple implements Partial<UserNew> {
	@Field(returns => String )
	firstName: string
	
	@Field(returns => String )
	lastName: string
}
