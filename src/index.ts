import {main} from '@/server'
import {log} from '@/utils/libsExport'

process.on('uncaughtException', (error) => {
	console.error(`uncaught Exception: ${error.message}`)
	console.error(error)
	process.exit(1)
})

process.on('unhandledRejection', (error) => {
	console.error(error)
})

main().catch((err) => {
	log.error('Error in main:')
	console.error(err)
})
