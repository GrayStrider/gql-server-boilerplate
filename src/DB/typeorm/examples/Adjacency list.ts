import {Field, ObjectType} from 'type-graphql'
import {BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm'


// TODO not sure how to make it work with type-graphql inputs

@Entity()
@ObjectType()
class Category extends BaseEntity {
	
	@Field()
	@PrimaryGeneratedColumn()
	id: number
	
	@Field()
	@Column()
	name: string
	
	@Field()
	@Column()
	description: string
	
	@Field(returns => Category)
	@OneToMany(type => Category, category => category.children)
	parent: Category
	
	@Field(returns => Category)
	@ManyToOne(type => Category, category => category.parent)
	children: Category
	
}

export default Category
