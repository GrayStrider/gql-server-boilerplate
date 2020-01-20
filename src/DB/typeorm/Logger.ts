import {Logger, QueryRunner} from 'typeorm'
import {DBRequestCounterService} from '@/utils/typegraphql/middleware/DBRequestCounter.service'

/* eslint-disable @typescript-eslint/no-empty-function*/

export class CustomLogger implements Logger {

	log (
		level: 'log' | 'info' | 'warn', message: unknown, queryRunner?: QueryRunner
	) {
	}

	logMigration (message: string, queryRunner?: QueryRunner) {
	}

	logQuery (
		query: string, parameters?: unknown[], queryRunner?: QueryRunner
	) {

		if (query !== 'START TRANSACTION' && query !== 'COMMIT') {

			const counter = DBRequestCounterService.connect()
			// Log.log( `${counter.getCount + 1 ?? 'N/A'}: ${query}`)
			counter.increment()

		}

	}

	logQueryError (
		error: string, query: string, parameters?: unknown[], queryRunner?: QueryRunner
	) {
	}

	logQuerySlow (
		time: number, query: string, parameters?: unknown[], queryRunner?: QueryRunner
	) {
	}

	logSchemaBuild (message: string, queryRunner?: QueryRunner) {

	}


}
