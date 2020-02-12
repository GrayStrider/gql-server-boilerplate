import {Entity, BaseEntity, PrimaryGeneratedColumn} from 'typeorm'
import {Column} from 'typeorm'

export enum Cities {
	SF = 'San Francisco',
	HW = 'Hayward'
}

@Entity()
export default class Weather extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string
	
	@Column({type: 'enum', enum: Cities})
	city: Cities
	
	@Column()
	temp_lo: number
	
	@Column()
	temp_hi: number
	
	@Column({type: 'float'})
	prcp: number
	
	@Column()
	date: Date
}

