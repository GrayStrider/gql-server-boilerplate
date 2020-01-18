import {PostgresConnectionOptions} from 'typeorm/driver/postgres/PostgresConnectionOptions'
import {CustomLogger} from '@/DB/typeorm/Logger'
import {POSTGRES_URL, POSTRGRES_DATABASE, POSTRGRES_PASSWORD, POSTRGRES_PORT, POSTRGRES_USERNAME} from './_consts'

export const ORMConfig: PostgresConnectionOptions = {
	name       : 'default',
	type       : 'postgres',
	host       : POSTGRES_URL,
	port       : POSTRGRES_PORT,
	username   : POSTRGRES_USERNAME,
	password   : POSTRGRES_PASSWORD,
	database   : POSTRGRES_DATABASE,
	logger: new CustomLogger(),
	logging: ['query', 'error'],
	entities: [
		'src/models/**/entity/**/!(*.test.ts)',
		'src/models/**/entity/**/!(*.spec.ts)',
		'src/models/KBF/entity/index.ts'
		
	]
}
