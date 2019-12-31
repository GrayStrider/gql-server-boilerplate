import {start} from 'repl'
import {Arg, Mutation, Query, Resolver} from 'type-graphql'
import {getConnection} from 'typeorm'
import {PaginatedUserResponse} from '../../utils/type-graphql/paginatedResponse'
import {LikeWrapper} from '../../utils/typeorm/LikeWrapper'
import {UserNew} from '../entity/User'
import {generateMockUsers} from './generateMockUsers'
import {UserCreateInput, UserModifyInput, UserSearchInput} from './inputs'

@Resolver()
export class UserResolver {
	@Mutation(returns => [UserNew])
	async generateMockUsers(@Arg('amount') amount: number) {
		const {generated} = await generateMockUsers(amount)
		return generated
	}
	
	
	@Query(returns => PaginatedUserResponse)
	async usersPaginated(@Arg('upTo', {nullable: true}) upTo: number, @Arg('startAt', {nullable: true}) startAt: number): Promise<PaginatedUserResponse> {
		return {
			items: await UserNew.find({take: upTo, skip: startAt}),
			total: await UserNew.count(),
			hasMore: false
		}
	}
	
	
	@Query(returns => [UserNew])
	async users(@Arg('searchBy', {nullable: true}) input: UserSearchInput) {
		
		LikeWrapper(input)
		return await UserNew.find(input)
	}
	
	@Mutation(returns => UserNew)
	async userCreate(@Arg('userData') input: UserCreateInput) {
		
		return await UserNew.create(input).save()
	}
	
	@Mutation(returns => UserNew)
	async userModify(@Arg('userId') userId: string, @Arg('changes') changes: UserModifyInput) {
		const conn = await getConnection()
		const user = await UserNew.findOne(userId)
		if (!user) { throw new Error('User not found')}
		
		return await conn
			.getRepository(UserNew)
			.merge(user, changes)
			.save()
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
