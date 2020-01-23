import fs from 'fs'
import {mergeDeepLeft, isNil, keys, prop} from 'ramda'
import {AnyObject} from 'tsdef'

const getTime = () =>
	process.hrtime()[0]
const env = process.env.NODE_ENV

export function hrLogger (logPath = './log.json') {

	const stringify = (obj: AnyObject) =>
		JSON.stringify(obj, null, 2)
	const logFile: Log<LogEntry> = JSON.parse(fs.readFileSync(logPath).toString())
	
	
	function update (val: Log<LogEntry>) {

		fs.writeFileSync(
			logPath,
			stringify(mergeDeepLeft(val, logFile))
		)
		return exp
	
	}
	
	function log (location: string) {

		const prevTime = prop('time', logFile[keys(logFile)[0]])
		if (isNil(prevTime)) throw new Error('time value not found')
		const time = getTime()
		const interval = time - prevTime
		const val = {[location]: {time, interval}}
		const newValue = mergeDeepLeft(val, logFile)
		fs.writeFileSync(logPath,
			stringify(newValue))


		return exp
	
	}
	
	
	function start (name: string) {

		update({[name]: {time: getTime()}})
		return exp
	
	}
	
	
	const exp = {
		start, log,
	}
	return exp
	
}

export interface Log<T> {
	[key: string]: T
}

interface LogEntry {
	time?: number
	end?: number
	duration?: number
	interval?: number
}

interface Targets {
	[key: string]: number
}
