import {ClassType, Field, Int, ObjectType} from 'type-graphql'
import {UserNew} from '../../__typeorm reference/entity/User'
import {User} from '../../entity/User'

export default function PaginatedResponse<TItem>(TItemClass: ClassType<TItem>) {
	// `isAbstract` decorator option is mandatory to prevent registering in schema
	@ObjectType({ isAbstract: true })
	abstract class PaginatedResponseClass {
		@Field(type => [TItemClass])
		items: TItem[];
		
		@Field(type => Int)
		total: number;
		
		@Field()
		hasMore: boolean;
	}
	return PaginatedResponseClass as any
}

@ObjectType()
export class PaginatedUserResponse extends PaginatedResponse(UserNew) {
	// we can freely add more fields or overwrite the existing one's types
	// @Field(type => [String])
	// otherInfo: string[];
}
