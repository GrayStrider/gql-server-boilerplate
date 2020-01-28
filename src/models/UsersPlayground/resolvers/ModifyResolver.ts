import {Resolver, Authorized, Mutation, Arg} from 'type-graphql'
import AuthRoles from '@/models/UsersPlayground/lib/auth/authRoles'
import {UserNew} from '@/models/UsersPlayground'
import {UserModifyInput} from '@/models/UsersPlayground/inputs'
import {userNotFoundError, RD, bb} from '@/utils'

@Resolver()
export default class ModifyResolver {
	
	@Authorized([AuthRoles.ADMIN])
	@Mutation(returns => UserNew)
	async userModify (@Arg('changes') {friendsIds, ...rest}: UserModifyInput, @Arg('userId') userId: string) {
		
		const user = await UserNew.findOne(userId)
		if (!user) throw userNotFoundError(userId)
		
		/**
		 * Handle friends
		 * for each friend in changes,
		 * fetch user and add it to changes
		 * if not found, throw
		 */
		const friends = RD.isNotNilOrEmpty(friendsIds)
			? await bb.reduce(friendsIds,
				async (total: UserNew[], id) => {
					
					const friend = await UserNew.findOne(id)
					if (!friend) throw userNotFoundError(id)
					return total.concat(friend)
					
				}, [])
			: undefined
		
		return UserNew
			.merge(user, {...rest, friendsPrimary: friends})
			.save()
		
	}
	
	
}
