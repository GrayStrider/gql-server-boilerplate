import {Args, Mutation, Query, Resolver} from 'type-graphql'
import {UserNew} from '../entity/User'
import {UserCreateInput, UserSearchInput} from './inputs'

@Resolver()
export class UserResolver {
	@Query(returns => [UserNew])
	async users(@Args() input: UserSearchInput) {
		
		// TODO Like for strings
		return await UserNew.find(input)
	}
	
	@Mutation(returns => UserNew)
	async userCreate(@Args() input: UserCreateInput) {
		
		return await UserNew.create(input).save()
	}
	
	
}


