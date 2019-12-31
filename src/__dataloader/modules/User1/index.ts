import {Arg, Mutation, Query, Resolver} from 'type-graphql'
import {User1} from '../../entity/User1'
import {User1NewInput} from '../../inputs/User1NewInput'

@Resolver()
export class User1Resolver {
	@Mutation(returns => User1)
	async user1Create(@Arg('userData') input: User1NewInput) {
		
		return await User1.create(input).save()
	}

@Query(returns => User1)
	async users1() {
		
		return await User1.find()
	}
	
	
	
}
