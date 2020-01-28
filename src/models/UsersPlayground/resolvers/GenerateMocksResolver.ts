import {Resolver, Mutation, Arg} from 'type-graphql'
import {UserNew, generateMockUsers} from '@/models/UsersPlayground'

@Resolver()
export default class GenerateMocksResolver {
	
	@Mutation(returns => [UserNew])
	async generateMockUsers (@Arg('amount') amount: number) {
		
		const {generated} = await generateMockUsers(amount)
		return generated
		
	}
	
}
