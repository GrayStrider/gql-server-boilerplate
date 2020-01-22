import signale from 'signale'
import * as RD from 'ramda-adjunct'
export {hrLogger} from '@/utils/hrLogger'
export {Promise as bb} from 'bluebird'
export {ApolloError} from 'apollo-server-errors'
export const sig = signale

export const log = (message?: unknown, ...optionalParams: unknown[]) =>
	console.log(message, ...optionalParams)

export const consoleWrite = (message?: unknown, ...optionalParams: unknown[]) => {
	
	process.stdout.write(`${JSON.stringify(message)}`)
	optionalParams.forEach(msg => process.stdout.write(`${JSON.stringify(msg)}`))
	
}
export {RD}
// Const logger = winston.createLogger({
// 	Level: 'info',
// 	Format: winston.format.json(),
// 	DefaultMeta: {service: 'user-service'},
// 	Transports: [
//
// 		/*
// 		 *
// 		 * - Write all logs with level `error` and below to `error.log`
// 		 * - Write all logs with level `info` and below to `combined.log`
// 		 *
// 		 */
//
// 		New winston.transports.File({filename: 'error.log', level: 'error'}), new winston.transports.File({filename:
// 'combined.log'}), ], })  if (process.env.NODE_ENV !== 'production') logger.add(new winston.transports.Console({
// Format: combine( errors({stack: true}) ), }))
