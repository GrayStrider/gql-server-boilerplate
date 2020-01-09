import {ClassType, Field, Int, ObjectType} from 'type-graphql'
import {UserNew} from '../../models/UsersPlayground/entity/User'
import {User} from '../../models/Original/entity/User'


export interface TPaginatedRes<TItem> {
	items: TItem[];
	
	total: number;
	
	hasMore: boolean;
}

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


}
