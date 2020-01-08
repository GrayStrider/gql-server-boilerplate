import {Field, ObjectType} from 'type-graphql'
import {Column, Entity, ManyToOne} from 'typeorm'
import {ExampleEntity} from './Entity'
import {GenericFeatures} from './GenericFeaturesEntity'

@ObjectType()
@Entity()
export class Child extends GenericFeatures {
	@Field()
	@Column({default: 'default'})
	data: string
	
	@Field(returns => ExampleEntity)
	@ManyToOne(type => ExampleEntity, entity => entity.children)
	parent: ExampleEntity
}
