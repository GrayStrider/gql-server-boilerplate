import main from '@/server'
import {sig} from '@/utils'
import {NODE_ENV} from 'config/_consts'

process.on('uncaughtException', error => {
	
	console.error(`uncaught Exception: ${error.message}`)
	console.error(error)
	// eslint-disable-next-line no-process-exit
	process.exit(1)
	
})

process.on('unhandledRejection', error => {
	
	console.error(error)
	
})

main().catch(err => {
	
	sig.error('Error in main:')
	console.error(err)
	
	// eslint-disable-next-line no-process-exit
	if (NODE_ENV === 'production' || NODE_ENV === 'test') process.exit(1)
	
})
