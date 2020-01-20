import signale from 'signale'

export {Promise as bb} from 'bluebird'
export {ApolloError} from 'apollo-server-errors'
export const log = signale

export const consoleWrite = (message?: unknown, ...optionalParams: unknown[]) => {
	process.stdout.write(`${message}`)
	optionalParams.forEach((msg) =>
		process.stdout.write(`${msg}`)
	)
}
