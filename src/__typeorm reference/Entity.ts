import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from 'typeorm'

//================================================================================
// Entity
//================================================================================

@Entity()
export class User extends BaseEntity {
	
	// @PrimaryColumn()
	@PrimaryGeneratedColumn()
	id: number
	
	// @PrimaryColumn() // you can have several
	@Column()
	firstName: string
	
	@Column()
	lastName: string
	
	@Column()
	isActive: boolean
	
}

