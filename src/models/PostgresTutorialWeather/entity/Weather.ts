import {Entity, BaseEntity, PrimaryGeneratedColumn, ManyToOne} from 'typeorm'
import {Column} from 'typeorm'
import City from '@/models/PostgresTutorialWeather/entity/City'

export enum Cities {
	SF = 'San Francisco',
	HW = 'Hayward'
}

@Entity()
export default class Weather extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string
	
	@ManyToOne(type => City, c => c.weatherData)
	city: City
	
	@Column()
	temp_lo: number
	
	@Column()
	temp_hi: number
	
	@Column({type: 'float'})
	prcp: number
	
	@Column()
	date: Date
}

