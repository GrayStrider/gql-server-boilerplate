import {PostgresConnectionOptions} from 'typeorm/driver/postgres/PostgresConnectionOptions'
import {POSTGRES_URL, POSTRGRES_DATABASE, POSTRGRES_PASSWORD, POSTRGRES_PORT, POSTRGRES_USERNAME} from './consts'

export const ORMConfig: PostgresConnectionOptions = {
	name       : 'default',
	type       : 'postgres',
	host       : POSTGRES_URL,
	port       : POSTRGRES_PORT,
	username   : POSTRGRES_USERNAME,
	password   : POSTRGRES_PASSWORD,
	database   : POSTRGRES_DATABASE,
	synchronize: true,
	logging    : ["error"],
	entities   : [
		'src/entity/**'
	]
}
