import signale from 'signale'
import * as RD from 'ramda-adjunct'
import {Promise as bb} from 'bluebird'
import Errors from '@/utils/Errors'
import log from '@/utils/log'
import flattenObject from '@/utils/flattenObject'
import warn from '@/utils/warn'
import sleep from '@/utils/sleep'
import isUp from '@/utils/isUp'
import consoleWrite from '@/utils/consoleWrite'

const sig = signale

export * from '@/utils/Errors'
export {
	Errors,
	RD,
	sig,
	log,
	bb,
	flattenObject,
	warn,
	sleep,
	isUp,
	consoleWrite
}
