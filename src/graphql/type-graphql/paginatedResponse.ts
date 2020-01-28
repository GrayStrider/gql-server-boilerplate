import {ClassType, Field, Int, ObjectType} from 'type-graphql'
import {AnyConstructor} from 'tsdef'
import UserNew from '@/models/UsersPlayground/entity/User'

function PaginatedResponse<TItem> (itemClass: ClassType<TItem>) {
	
	// `isAbstract` decorator option is mandatory to prevent registering in schema
	@ObjectType(`Paginated${itemClass.name}Response`, {isAbstract: true})
	abstract class PaginatedResponseClass {
		
		@Field(type => [itemClass])
		items: TItem[]
		
		@Field(type => Int)
		total: number
		
		@Field()
		hasMore: boolean
		
	}
	
	return PaginatedResponseClass as AnyConstructor
	
}

@ObjectType()
export default class PaginatedUserResponse extends PaginatedResponse(UserNew) {}

