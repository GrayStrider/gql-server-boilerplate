import {Resolver, Mutation, Arg} from 'type-graphql'
import {UserNew} from '@/models/UsersPlayground'
import {UserCreateInput} from '@/models/UsersPlayground/inputs'
import {birthYearFromAge} from '@/models/UsersPlayground/lib'

@Resolver()
export default class CreateResolver {
	
	@Mutation(returns => UserNew)
	async userCreate (@Arg('userData') {age, ...rest}: UserCreateInput) {
		
		return UserNew.create({yearBorn: birthYearFromAge(age), ...rest}).save()
		
	}
	
}
