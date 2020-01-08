import {Logger, QueryRunner} from 'typeorm'
import {DBRequestCounterService} from '../../__typeorm reference/Middleware/DBRequestCounter'

export class CustomLogger implements Logger {
	
	log(level: 'log' | 'info' | 'warn', message: any, queryRunner?: QueryRunner): any {
	}
	
	logMigration(message: string, queryRunner?: QueryRunner): any {
	}
	
	logQuery(query: string, parameters?: any[], queryRunner?: QueryRunner): any {
		if (query !== 'START TRANSACTION' && query !== 'COMMIT') {
			const counter = DBRequestCounterService.connect()
			// log.log( `${counter.getCount + 1 ?? 'N/A'}: ${query}`)
			counter.increment()
		}
		
	}
	
	logQueryError(error: string, query: string, parameters?: any[], queryRunner?: QueryRunner): any {
	}
	
	logQuerySlow(time: number, query: string, parameters?: any[], queryRunner?: QueryRunner): any {
	}
	
	logSchemaBuild(message: string, queryRunner?: QueryRunner): any {
	
	}
	
	
}
