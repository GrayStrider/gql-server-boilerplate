import {main} from '@/server'


//================================================================================
// Main server module is exposed for use in testing
//================================================================================

process.on('uncaughtException', (error) => {
	
	console.error(`uncaught Exception: ${error.message}`)
	console.error(error)
	
	process.exit(1) // exit application
	
})


process.on('unhandledRejection', () => {
	console.error(`unhandledRejection`)
});

main().catch(console.error)
