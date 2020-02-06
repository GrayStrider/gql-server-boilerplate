import {Resolver, Mutation, Arg} from 'type-graphql'
import {hash} from 'bcryptjs'
import {UserCreateInput} from '@/models/inputs'
import {UserNew} from '@/models'
import {validatePassword, birthYearFromAge} from '@/models/lib'

@Resolver()
export default class RegisterResolver {

	@Mutation(returns => Boolean)
	async register (@Arg('userData') {age, password, ...rest}: UserCreateInput) {
		
		validatePassword(password)
		const hashedPassword = await hash(password, 12)
		
		await UserNew.create({
			yearBorn: birthYearFromAge(age),
			password: hashedPassword,
			...rest,
		}).save()
		return true
		
	}

}
