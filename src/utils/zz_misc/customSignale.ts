import signale, {Signale} from 'signale'

export function customSignale () {

	const options = {
		disabled: false,
		interactive: false,
		logLevel: 'info',
		scope: 'custom',
		secrets: [],
		stream: process.stdout,
		types: {
			remind: {
				badge: '**',
				color: 'yellow',
				label: 'reminder',
				logLevel: 'info',
			},
			santa: {
				badge: '🎅',
				color: 'red',
				label: 'santa',
				logLevel: 'info',
			},
		},
	}
	const custom = new Signale(options)

	signale.success()
	signale.log()
	signale.error()
	signale.fatal()
	signale.warn()
	signale.start()
	signale.note()
	signale.await()
	signale.complete()
	signale.debug()
	custom.remind()
	custom.santa()

}
