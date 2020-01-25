import {ArgsType} from 'type-graphql'
import {Category} from '@/DB/typeorm/examples'

@ArgsType()
export default class ListsInput implements Partial<Category> {
	
	description: string
	
	name: string
	
}
