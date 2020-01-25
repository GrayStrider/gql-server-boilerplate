import {Resolver, Query, Arg, Authorized} from 'type-graphql'
import {UserNew} from '@/models/UsersPlayground'
import {UserSearchInput} from '@/models/UsersPlayground/inputs'
import AuthRoles from '@/models/UsersPlayground/lib/auth/authRoles'
import PaginatedUserResponse from '@/graphql/type-graphql/paginatedResponse'

@Resolver()
export default class UserResolver {
	
	@Query(returns => [UserNew])
	async users (@Arg('searchBy', {nullable: true}) input: UserSearchInput) {
		
		// LikePropertyWrapper(input) // TODO make it work with enums, or create a separate middleware decorator for strings
		return UserNew.find(input)
		
	}
	
	@Authorized<AuthRoles[]>([AuthRoles.ADMIN])
	@Query(returns => PaginatedUserResponse)
	async usersPaginated (
		@Arg('upTo', {nullable: true}) upTo: number,
			@Arg('startAt', {nullable: true}) startAt: number
	): Promise<PaginatedUserResponse> {
		
		return {
			items: await UserNew.find({take: upTo, skip: startAt}),
			total: await UserNew.count(),
			// TODO
			hasMore: false,
		}
		
	}
	
}
