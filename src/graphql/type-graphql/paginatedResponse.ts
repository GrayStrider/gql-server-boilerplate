import {ClassType, Field, Int, ObjectType} from 'type-graphql'
import {UserNew} from '@/models/UsersPlayground/entity/User'
import {AnyConstructor} from 'tsdef'

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
export class PaginatedUserResponse extends PaginatedResponse(UserNew) {}
