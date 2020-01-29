import signale from 'signale'
import * as RD from 'ramda-adjunct'
import {Promise as bb} from 'bluebird'
import gql from 'graphql-tag'
import Errors from '@/utils/Errors'
import log from '@/utils/log'
import flattenGQLResponse from '@/utils/flattenGQLResponse'
import warn from '@/utils/warn'
import sleep from '@/utils/sleep'
import consoleWrite from '@/utils/consoleWrite'

signale.config({
	displayScope: true,
	displayBadge: false,
	displayDate: false,
	displayFilename: true,
	displayLabel: true,
	displayTimestamp: true,
	underlineLabel: true,
	underlineMessage: false,
	underlinePrefix: false,
	underlineSuffix: false,
	uppercaseLabel: false,
})

export * from '@/utils/Errors'
export * from '@/utils/testing/supertest'

export {
	Errors,
	RD,
	signale,
	log,
	bb,
	flattenGQLResponse,
	warn,
	sleep,
	consoleWrite,
	gql
}
