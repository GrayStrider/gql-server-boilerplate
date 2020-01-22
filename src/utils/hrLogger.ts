import fs from 'fs'
import R from 'ramda'
import chalk from 'chalk'

export function hrLogger(logPath = './log.json') {
	const log: Log<LogEntry> = JSON.parse(fs.readFileSync(logPath).toString())
	const update = (values: Log<LogEntry>) => {
		fs.writeFileSync(
			logPath,
			JSON.stringify(R.mergeDeepLeft(values, log)))
		return exp
	}
	
	const start = (name = 'init') => {
		update({[name]: {start: process.hrtime()}})
		return exp
	}
	
	const timeSince = (name = 'init') => {
		const startTime = log[name].start
		const endTime = process.hrtime(startTime)
		return endTime[0]
	}
	
	const logTimeSince = (location: string, name = 'init') => {
		console.log(`since [${name === 'init' ? chalk.green(name) : name}] from [${location}]: ${chalk`{red ${timeSince(name)}s}`}`)
		return exp
	}
	
	
	const end = (name = 'init') => {
		update({
			[name]: {
				end: process.hrtime(),
				duration: timeSince(name),
			},
		})
		return exp
	}
	
	const exp = {
		start, end, timeSince, logTimeSince,
	}
	return exp
	
}

export interface Log<T> {
	[key: string]: T
}

interface LogEntry {
	start?: [number, number]
	end?: [number, number]
	duration?: number
}
