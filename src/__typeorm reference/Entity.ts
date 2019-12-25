import {Field, ObjectType} from 'type-graphql'
import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from 'typeorm'

//================================================================================
// Entity
//================================================================================

@ObjectType()
@Entity()
export class ExampleEntity extends BaseEntity {
	
	@Field()
	// @PrimaryColumn()
	@PrimaryGeneratedColumn()
	id: number
	
	@Field()
	// @PrimaryColumn() // you can have several
	@Column()
	name: string
	
	@Field()
	@Column()
	isActive: boolean
	
}

