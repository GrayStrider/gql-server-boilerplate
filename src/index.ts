import {main} from '@/server'

process.on('uncaughtException', (error) => {
	console.error(`uncaught Exception: ${error.message}`)
	console.error(error)
	process.exit(1)
})

process.on('unhandledRejection', (error) => {
	console.error(error)
})

main().catch(console.error)
