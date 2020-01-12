import {Validator} from 'class-validator'
import {Arg, Authorized, Mutation, Query, Resolver, Ctx} from 'type-graphql'
import {bb} from 'src/utils/libsExport'
import {AuthRoles} from 'src/models/UsersPlayground/auth/authRoles'
import {PaginatedUserResponse} from '@/graphql/type-graphql/paginatedResponse'
import {UserNew} from 'src/models/UsersPlayground/entity/User'
import {Errors, userNotFoundError} from '@/utils/Errors'
import {generateMockUsers} from 'src/models/UsersPlayground/lib/generateMockUsers'
import {UserCreateInput, UserModifyInput, UserSearchInput, UserLoginInput} from '@/models/UsersPlayground/user.inputs'
import bcrypt from 'bcryptjs'
import {Context} from '@/graphql'

export const validator = new Validator()
export const birthYearFromAge = (age: number) => new Date().getFullYear() - age
const validatePassword = (password: string): true => {
	if (false) {
		throw new Errors.Validation('Password must contain...')
	}
	return true
}

@Resolver()
export class UserResolver {
	@Mutation(returns => UserNew)
	async login(
		@Ctx() {session}: Context,
		@Arg("credentials") {email, password}: UserLoginInput) {
		const user = await UserNew.findOne({email})
		if (!(user)) throw new Errors.InvalidCredentials
		const valid = await bcrypt.compare(password, user.password)
		if (!(valid)) throw new Errors.InvalidCredentials
		session!.userId = user.id
		return user
	}
	
	
	@Mutation(returns => Boolean)
	async register(@Arg('userData') {age, password, ...rest}: UserCreateInput) {
		validatePassword(password)
		const hashedPassword = await bcrypt.hash(password, 12)
		
		await UserNew.create({
			yearBorn: birthYearFromAge(age),
			password: hashedPassword,
			...rest,
		}).save()
		return true
	}
	
	
	@Mutation(returns => [UserNew])
	async generateMockUsers(
		@Arg('amount') amount: number) {
		const {generated} = await generateMockUsers(amount)
		return generated
	}
	
	@Authorized<AuthRoles[]>([AuthRoles.ADMIN])
	@Query(returns => PaginatedUserResponse)
	async usersPaginated(
		@Arg('upTo', {nullable: true}) upTo: number,
		@Arg('startAt', {nullable: true}) startAt: number): Promise<PaginatedUserResponse> {
		return {
			items: await UserNew.find({take: upTo, skip: startAt}),
			total: await UserNew.count(),
			hasMore: false, // TODO
		}
	}
	
	
	@Query(returns => [UserNew])
	async users(@Arg('searchBy', {nullable: true}) input: UserSearchInput) {
		// LikeWrapper(input) // TODO make it work with enums, or create a separate middleware decorator for strings
		return await UserNew.find(input)
	}
	
	@Mutation(returns => UserNew)
	async userCreate(@Arg('userData') {age, ...rest}: UserCreateInput) {
		return await UserNew.create({yearBorn: birthYearFromAge(age), ...rest}).save()
	}
	
	@Authorized([AuthRoles.ADMIN])
	@Mutation(returns => UserNew)
	async userModify(@Arg('changes') {friendsIds, ...rest}: UserModifyInput,
	                 @Arg('userId') userId: string) {
		if (!(validator.isUUID(userId))) throw new Errors.Validation('Incorrect format for user ID')
		
		const user = await UserNew.findOne(userId)
		if (!user) throw userNotFoundError(userId)
		
		/**
		 * Handle friends
		 * for each friend in changes,
		 * fetch user and add it to changes
		 * if not found, throw
		 */
		const friends = friendsIds
			? await bb.reduce(friendsIds,
				async (total: UserNew[], id) => {
					const user = await UserNew.findOne(id)
					if (!user) throw userNotFoundError(id)
					return total.concat(user)
				}, [],
			)
			: undefined
		
		return UserNew
			.merge(user, {...rest, friendsPrimary: friends})
			.save()
	}
	
}
