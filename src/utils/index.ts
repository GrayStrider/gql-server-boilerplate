import signale from 'signale'
import * as RD from 'ramda-adjunct'
import chalk from 'chalk'
import {keys, head, values} from 'ramda'
import axios from 'axios'
import Errors from '@/utils/Errors'

const log = (message?: unknown, ...optionalParams: unknown[]) =>
	console.log(message, ...optionalParams)

const consoleWrite = (message?: unknown, ...optionalParams: unknown[]) => {
	
	process.stdout.write(`${JSON.stringify(message)}`)
	optionalParams.forEach(msg => process.stdout.write(`${JSON.stringify(msg)}`))
	
}
async function isUp (url: string): Promise<boolean> {
	
	return axios.get(url)
		.then(() => true)
		.catch(err => {
			
			if (err.code === 'ECONNREFUSED') return false
			
			sig.warn(err.message)
			return true
			
		})
	
}
async function sleep (ms: number): Promise<void> {
	
	return new Promise(resolve => setTimeout(() => resolve(undefined), ms))
	
}
function warn (...msg: unknown[]) {
	
	msg.forEach(value => {
		
		console.log(
			chalk.bgBlack.bold.whiteBright(
				typeof value === 'object'
					? JSON.stringify(value, null, 2)
					: value
			)
		)
		
	})
	
}
function flattenObject (input: object) {
	
	return keys(input).length > 1
		? input
		: head(values(input))
	
}

const sig = signale

export * from '@/utils/Errors'
export {flattenObject, warn, sleep, RD, log, consoleWrite, sig, isUp, Errors}
export {Promise as bb} from 'bluebird'
export {ApolloError} from 'apollo-server-errors'

