import {Field, ObjectType, Resolver} from 'type-graphql'
import {BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm'
import {validateAndSave} from '../utils/validator'


// TODO not sure how to make it work with type-graphql inputs

@Entity()
@ObjectType()
export class Category extends BaseEntity {
	
	@Field()
	@PrimaryGeneratedColumn()
	id: number;
	
	@Field()
	@Column()
	name: string;
	
	@Field()
	@Column()
	description: string;
	
	@Field(returns => Category)
	@OneToMany(type => Category, category => category.children)
	parent: Category;
	
	@Field(returns => Category)
	@ManyToOne(type => Category, category => category.parent)
	children: Category;
}

@Resolver()
export class ListsResolver {
	async adjacencyList() {
		return validateAndSave(Category.create({}))
	}
}
