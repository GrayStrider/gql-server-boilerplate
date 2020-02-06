import {Resolver, Mutation, Arg} from 'type-graphql'
import {UserNew} from '@/models'
import {UserCreateInput} from '@/models/inputs'
import {birthYearFromAge} from '@/models/lib'

@Resolver()
export default class CreateResolver {
	
	@Mutation(returns => UserNew)
	async userCreate (@Arg('userData') {age, ...rest}: UserCreateInput) {
		
		return UserNew.create({yearBorn: birthYearFromAge(age), ...rest}).save()
		
	}
	
}
