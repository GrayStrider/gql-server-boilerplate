import {Field, ObjectType} from 'type-graphql'
import {BaseEntity, Entity, ManyToMany, PrimaryGeneratedColumn} from 'typeorm'
import {Album} from './Album'

@Entity()
@ObjectType()
export class Photo extends BaseEntity {
	@Field()
	@PrimaryGeneratedColumn()
	id: number
	
	
	@Field(returns => [Album])
	@ManyToMany(type => Album, album => album.photos)
	albums: Album[]
}


