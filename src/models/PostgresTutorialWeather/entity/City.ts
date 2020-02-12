import {Entity, BaseEntity, Column, PrimaryColumn, Check} from 'typeorm'

@Entity()
export default class City extends BaseEntity {
	@PrimaryColumn({length: 3})
	@Check(`upper(code) = code`)
	code: string
	
	@Column({length: 30})
	name: string
}
