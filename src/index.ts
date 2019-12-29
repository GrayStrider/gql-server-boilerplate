import chalk from 'chalk'
import {main} from './server'
import * as Sentry from '@sentry/node'


//================================================================================
// Main server module is exposed for use in testing
//================================================================================



main().catch((err) => {
	Sentry.captureException(err)
	console.error(chalk.red.bold(err)) })
