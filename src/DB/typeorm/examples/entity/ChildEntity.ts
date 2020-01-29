import {Field, ObjectType} from 'type-graphql'
import {Column, Entity, ManyToOne} from 'typeorm'
import {ExampleEntity, GenericFeatures} from '@/DB/typeorm/examples'

@ObjectType()
@Entity()
export default class Child extends GenericFeatures {
	
	@Field()
	@Column({default: 'default'})
	data: string
	
	@Field(returns => ExampleEntity)
	@ManyToOne(type => ExampleEntity, entity => entity.children)
	parent: ExampleEntity
	
}

