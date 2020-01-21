import signale from 'signale'
import winston, {format} from 'winston'

const {combine, errors} = format

export {Promise as bb} from 'bluebird'
export {ApolloError} from 'apollo-server-errors'
export const sig = signale

export const log = (message?: unknown, ...optionalParams: unknown[]) =>
	console.log(message, ...optionalParams)

export const consoleWrite = (message?: unknown, ...optionalParams: unknown[]) => {

	process.stdout.write(`${message}`)
	optionalParams.forEach(msg =>
		process.stdout.write(`${msg}`))

}


const logger = winston.createLogger({
	level: 'info',
	format: winston.format.json(),
	defaultMeta: {service: 'user-service'},
	transports: [

		/*
		 *
		 * - Write all logs with level `error` and below to `error.log`
		 * - Write all logs with level `info` and below to `combined.log`
		 *
		 */
		new winston.transports.File({filename: 'error.log', level: 'error'}), new winston.transports.File({filename: 'combined.log'}),
	],
})

if (process.env.NODE_ENV !== 'production')
	logger.add(new winston.transports.Console({
		format: combine(
			errors({stack: true})
		),
	}))

