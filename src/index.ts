import chalk from 'chalk'
import {main} from './server'
import * as Sentry from '@sentry/node'
import {log} from './utils/libsExport'
import {KoaServer} from '@/server.koa'


//================================================================================
// Main server module is exposed for use in testing
//================================================================================

process.on('uncaughtException', (error)  => {
	
	log.error(`uncaught Exception: ${error.message}`)
	log.error(error)
	
	process.exit(1); // exit application
	
})


process.on('unhandledRejection', (error, promise) => {
	log.error(`unhandledRejection: ${error.message}`)
	log.error(error)
});
KoaServer().catch(log.error)

// only at initialization!
// main().catch((err) => {
// 	Sentry.captureException(err)
// 	console.error(chalk.red.bold(err)) })



