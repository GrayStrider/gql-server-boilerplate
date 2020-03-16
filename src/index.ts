import main from '@/server'
import { sig } from '@qdev/utils-ts'
import {NODE_ENV, PORT, HOST} from '@config'

process.on('uncaughtException', error => {
	
	console.error(`uncaught Exception: ${error.message}`)
	console.error(error)
	// eslint-disable-next-line no-process-exit
	process.exit(1)
	
})

process.on('unhandledRejection', error => {
	
	console.error(error)
	
})

main()
	.then(app => app
		.listen(PORT, () =>
			sig.success(`Server started at http://${HOST}:${PORT}`)))
	.catch(err => {
	
		sig.error('Error in main:')
		console.error(err)
	
		// eslint-disable-next-line no-process-exit
		if (NODE_ENV === 'production' || NODE_ENV === 'test') process.exit(1)
		throw err
	
	})
