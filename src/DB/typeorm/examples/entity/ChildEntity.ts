import {Field, ObjectType} from 'type-graphql'
import {Column, Entity, ManyToOne} from 'typeorm'
import {ExampleEntity, GenericFeatures} from '@/DB/typeorm/examples'

@ObjectType()
@Entity()
class Child extends GenericFeatures {
	
	@Field()
	@Column({default: 'default'})
	data: string
	
	@Field(returns => ExampleEntity)
	@ManyToOne(type => ExampleEntity, entity => entity.children)
	parent: ExampleEntity
	
}

export default Child
