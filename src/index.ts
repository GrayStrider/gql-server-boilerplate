import {main} from '@/server'

process.on('uncaughtException', (error) => {
	console.error(`uncaught Exception: ${error.message}`)
	console.error(error)
	process.exit(1)
})

process.on('unhandledRejection', () => {
	console.error(`unhandledRejection`)
})

main().catch(console.error)
