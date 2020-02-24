import signale from 'signale'
import * as RD from 'ramda-adjunct'
import {Promise as bb} from 'bluebird'
import gql from 'graphql-tag'
import log from './log'
import flattenGQLResponse from './flattenGQLResponse'
import warn from './warn'
import sleep from './sleep'
import consoleWrite from './consoleWrite'
import axios from 'axios'
import Chance from 'chance'

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
const chance = new Chance()

export * from './testing/supertest'

export {
	RD,
	signale,
	log,
	bb,
	flattenGQLResponse,
	warn,
	sleep,
	consoleWrite,
	gql,
	axios,
	chance
}
