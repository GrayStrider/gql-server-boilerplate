import {Resolver, Mutation, Ctx, Arg} from 'type-graphql'
import {compare} from 'bcryptjs'
import {UserNew} from '@/models'
import {Context} from '@/graphql'
import {UserLoginInput} from '@/models/inputs'
import {Errors} from '@/utils'

@Resolver()
export default class LoginResolver {

	@Mutation(returns => UserNew)
	async login (
	@Ctx() {session}: Context,
		@Arg('credentials') {email, password}: UserLoginInput
	) {
		
		const user = await UserNew.findOne({email})
		if (!user) throw new Errors.InvalidCredentials()
		const isValid = await compare(password, user.password)
		if (!isValid) throw new Errors.InvalidCredentials()
		if (!session) return user
		session.userId = user.id
		return user
		
	}

}
