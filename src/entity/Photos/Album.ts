import {Field, ObjectType} from 'type-graphql'
import {BaseEntity, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn} from 'typeorm'
import {Photo} from './Photo'

@Entity()
@ObjectType()
export class Album extends BaseEntity {
	
	@Field()
	@PrimaryGeneratedColumn()
	id: number
	
	@Field()
	@Column()
	name: string
	
	@Field(returns => [Photo], {nullable: true})
	@ManyToMany(type => Photo, photo => photo.albums)
	@JoinTable()
	photos: Photo[]
}
