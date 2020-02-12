import {Entity, BaseEntity, Column, PrimaryColumn, Check, OneToMany} from 'typeorm'
import {Weather} from '@/models'

@Entity()
export default class City extends BaseEntity {
	@PrimaryColumn({length: 3})
	@Check(`upper(code) = code`)
	code: string
	
	@Column({length: 30})
	name: string
	
	@OneToMany(type => Weather, w => w.city)
	weatherData: Weather[]
}
