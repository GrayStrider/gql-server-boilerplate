import {Arg, Args, Mutation, Query, Resolver} from 'type-graphql'
import {LikeWrapper} from '../../utils/typeorm/LikeWrapper'
import {UserNew} from '../entity/User'
import {UserCreateInput, UserSearchInput} from './inputs'

@Resolver()
export class UserResolver {
	
	@Query(returns => [UserNew])
	async users(@Arg("searchBy", {nullable: true}) input: UserSearchInput) {

		LikeWrapper(input)
		return await UserNew.find(input)
	}
	
	@Mutation(returns => UserNew)
	async userCreate(@Arg("userData") input: UserCreateInput) {
		
		return await UserNew.create(input).save()
	}
}



export const Errors = {
	Validation: CustomError('ValidationError', 'Unspecified validation error')
}

function CustomError(name: string, defaultMessage: string) {
	return class ExpectedError extends Error {
		constructor(message: string = defaultMessage) {
			super(message)
			this.name = name
		}
	}
}
