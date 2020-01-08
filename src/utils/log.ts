import chalk from 'chalk'
import signale, {Signale} from 'signale'
export const log = signale

export function warn(...msg: any[]) {
	msg.forEach((value) => {
		console.log(
			chalk.bgBlack.bold.whiteBright(
				typeof value === 'object' ? JSON.stringify(
					value, null, 2) : value))
	})
	
}

export function printUncaughtError(...msg: any[]) {
	msg.forEach((value) => {
		console.error(
			chalk.bold.red.bgBlack(
				typeof value === 'object' ? JSON.stringify(
					value, null, 2) : value))
	})
}

function test() {
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
				logLevel: 'info'
			},
			santa: {
				badge: '🎅',
				color: 'red',
				label: 'santa',
				logLevel: 'info'
			}
		}
	};
	const custom = new Signale(options);
	
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
