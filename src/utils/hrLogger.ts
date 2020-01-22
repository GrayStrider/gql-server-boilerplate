import fs from 'fs'
import {mergeDeepLeft, isNil, keys, prop} from 'ramda'
import chalk from 'chalk'
import perfTargets from 'perfTargets.json'
import {AnyObject} from 'tsdef'
import {sig} from '@/utils/libsExport'

const getTime = () =>
	process.hrtime()[0]
const env = process.env.NODE_ENV

export function hrLogger(logPath = './log.json') {
	const stringify = (obj: AnyObject) =>
		JSON.stringify(obj, null, 2)
	const logFile: Log<LogEntry> = JSON.parse(fs.readFileSync(logPath).toString())
	const logFileRead = () => JSON.parse(fs.readFileSync(logPath).toString())
	
	
	const targets: Targets = perfTargets[env]
	if (isNil(targets)) throw new Error('targets not found')
	
	function update(val: Log<LogEntry>) {
		fs.writeFileSync(
			logPath,
			stringify(mergeDeepLeft(val, logFile)))
		return exp
	}
	
	function log(location: string) {
		const val = {[location]: {time: getTime()}}
		const targetVal = targets[location]
		if (isNil(targetVal)) throw new Error('target value not found')
		const newValue = mergeDeepLeft(val, logFile)
		
		fs.writeFileSync(logPath,
			stringify(newValue),
		)
		sig.debug('init started at ', logFile.init.time)
		// between current location and previous should have passed no more than x time
		// if location is first compare against init
		sig.debug('goal for:', location, targetVal)
		sig.debug('time from ', location, 'to')
		const logKeys = keys(logFileRead()).reverse()
		sig.debug('entries in the log', logKeys)
		sig.debug('current location and time', location, getTime())
		sig.debug('entries in targets', keys(targets))
		

		const prevIndex = logKeys.indexOf(location) - 1
		sig.debug('previous index was', prevIndex)
		const prevLocation = logKeys[prevIndex]
		const getTimeVal = (loc: string | number | symbol) => prop('time', logFileRead()[loc])
		
		const prevTimeVal = getTimeVal(prevLocation)
		const currentTimeVal = getTimeVal(location)
		sig.debug('previous location and time was',
			prevLocation, prevTimeVal)
		const interval = currentTimeVal - prevTimeVal
		sig.debug('difference in time between current time and previous',
			interval
			)
		sig.debug('first time value', getTimeVal(logKeys[0]))
		sig.debug('time between first and the last',
			getTimeVal(logKeys[logKeys.length - 1]) - getTimeVal(logKeys[0]))

		return exp
	}
	
	
	function start(name: string) {
		update({[name]: {time: getTime()}})
		return exp
	}
	
	function timeSince(name = 'init') {
		const startTime = logFile[name].time
		return getTime() - (startTime ?? 0)
	}
	
	function consoleLogTimeSince(location: string, name = 'init') {
		console.log(`since [${name === 'init' ? chalk.green(name) : name}] from [${location}]: ${chalk`{red ${timeSince(name)}s}`}`)
		return exp
	}
	
	
	const exp = {
		start, consoleLogTimeSince, log,
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
}

interface Targets {
	[key: string]: number
}
