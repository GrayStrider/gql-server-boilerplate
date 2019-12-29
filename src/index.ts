import chalk from 'chalk'
import {main} from './server'
import * as Sentry from '@sentry/node'


//================================================================================
// Main server module is exposed for use in testing
//================================================================================

process.on('uncaughtException', (error)  => {
	
	console.log('Oh my god, something terrible happend: ');
	
	process.exit(1); // exit application
	
})


process.on('unhandledRejection', (error, promise) => {
	console.log(' Oh Lord! We forgot to handle a promise rejection here: ');
	console.log(' The error was: ' );
});

// only at initialization!
main().catch((err) => {
	Sentry.captureException(err)
	console.error(chalk.red.bold(err)) })
