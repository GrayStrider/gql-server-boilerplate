import chalk from 'chalk'
import {main} from './server'
import * as Sentry from '@sentry/node'
import {log} from './utils/libsExport'


//================================================================================
// Main server module is exposed for use in testing
//================================================================================

process.on('uncaughtException', (error)  => {
	
	log.error(`uncaught Exception: ${error.message}`)
	log.error(error)
	
	process.exit(1); // exit application
	
})


process.on('unhandledRejection', () => {
	log.error(`unhandledRejection`)
});

// only at initialization!
main().catch((err) => {
	Sentry.captureException(err)
	console.error(chalk.red.bold(err)) })
