import {main} from '@/server'
import {log} from '@/utils/libsExport'
import {NODE_ENV} from 'config/_consts'

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
	if (NODE_ENV === 'production' || NODE_ENV === 'test') process.exit(1)
})
