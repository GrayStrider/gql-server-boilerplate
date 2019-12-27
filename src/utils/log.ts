import chalk from 'chalk'

export const warn = (...msg: any[]) =>
	console.log(chalk.bgBlack.bold.whiteBright(typeof msg === 'object' ? JSON.stringify(msg, null, 2) : msg))
