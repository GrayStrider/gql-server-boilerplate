import {Field, InputType} from 'type-graphql'
import {User1} from '../entity/User1'

@InputType()
export class User1NewInput implements Partial<User1> {
	@Field()
	name: string
	
	
}
