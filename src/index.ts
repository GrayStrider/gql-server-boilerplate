import {log} from './utils/libsExport'
import {KoaServer} from '@/server'


//================================================================================
// Main server module is exposed for use in testing
//================================================================================

process.on('uncaughtException', (error) => {
	
	log.error(`uncaught Exception: ${error.message}`)
	log.error(error)
	
	process.exit(1) // exit application
	
})


process.on('unhandledRejection', (error, promise) => {
	log.error(`unhandledRejection: ${error.message}`)
	log.error(error)
})

KoaServer().catch(log.error)
