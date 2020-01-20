import {
	IsEmail, IsInt, Max, Min
} from 'class-validator'
import {Field, InputType, Int} from 'type-graphql'
import {UserNew} from './entity/User'
import {Countries} from './lib/CountriesList'

/**
 * @InputType will generate a real GraphQLInputType type and should be used when we need a nested object in the args:
 *
 *updateItem(data: UpdateItemInput!): Item!
 *@ArgsType is virtual and it will be flattened in schema:
 *
 *updateItem(id: Int!, userId: Int!): Item!
 *TODO difference
 */

type UserCreateType = Partial<Omit<UserNew, 'age'>> & {age: number}
const IsValidEmail = IsEmail({}, {message: 'Invalid email format'})

@InputType()
export class UserCreateInput implements UserCreateType {

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

/**
 * Same fields as in create, but all nullable
 */
@InputType()
export class UserModifyInput implements UserCreateInput {

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

	@Field(returns => [String], {nullable: true})
	friendsIds: string[]

}

/**
 * Omit certain fields in search
 */
@InputType()
export class UserSearchInput implements Omit<UserModifyInput, 'password' | 'friendsIds'> {

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

@InputType()
export class UserLoginInput implements Pick<UserCreateInput, 'email' | 'password'> {

	@Field()
	@IsValidEmail
	email: string

	@Field()
	password: string

}
