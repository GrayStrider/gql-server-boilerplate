import {Promise as bb} from 'bluebird'
import {Arg, Mutation, Query, Resolver} from 'type-graphql'
import {getConnection} from 'typeorm'
import {log} from '../../utils/log'
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
			items  : await UserNew.find({take: upTo, skip: startAt}),
			total  : await UserNew.count(),
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
	async userModify(@Arg('changes') changes: UserModifyInput,
	                 @Arg('userId') userId: string) {
		const conn = await getConnection()
		const user = await UserNew.findOne(userId)
		if (!user) { throw new Error('User not found')}
		/**
		 * Handle friends
		 * for each friend in changes,
		 * fetch user and add it to changes
		 * if not found, throw
		 */
		const {friendsIds, ...rest} = changes

		
		const friends = friendsIds ? await bb.reduce(friendsIds,
			async (total: UserNew[], id) => {
				const user = await UserNew.findOne(id)
				if (!user) { throw new Error(`User ${id} not found`)}
				return [...total, user]
			}, []
		) : undefined
		
		return await conn
			.getRepository(UserNew)
			.merge(user, {...rest, friendsPrimary: friends})
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
