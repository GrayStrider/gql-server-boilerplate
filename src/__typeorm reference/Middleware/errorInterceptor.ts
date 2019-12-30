import chalk from 'chalk'
import {listenerCount} from 'cluster'
import {debounce} from 'lodash'
import {MiddlewareFn} from 'type-graphql'
import {printUncaughtError, withTime} from '../../utils/log'
import {TypeORMError} from '../../utils/typeorm/customError'

export const ErrorInterceptor2: MiddlewareFn = async (action, next) => {
	try {
		return await next()
	} catch (e) {
		if (e.constructor.name === 'ExpectedError') {
			printUncaughtError('Constructor ' + e.constructor.name)
			throw new Error('Intercepted: ' + e.message)
		} else {
			console.log(e)
			throw new Error('Uncaught error, ID has been recorded: ')
		}
	}
}

export const ErrorInterceptor3: MiddlewareFn =
	async ({context, args, info, root}, next) => {
		try {
			return await next()
		} catch (e) {
			throw new TypeORMError(e.message, {name: e.name, args})
			
		}
	}
const collect = debounce((m) => {
	console.log(chalk.yellow(withTime(m)))
	Listener.connect().clearCount()
}, 200, )

export const ErrorInterceptor: MiddlewareFn =
	async ({context, args, info, root}, next) => {
		try {
			const listener = Listener.connect()
			
			const res = await next()
			
			const count = listener.getCount
			
			if (count) {
				collect(count)
			}
			return res
		} catch (e) {
			throw e
			
		}
	}

export class Listener {
	private static instance: Listener
	private count: number = 0
	
	private constructor() {}
	
	get getCount(): number {
		return this.count
	}
	
	public static connect() {
		if (!Listener.instance) {
			Listener.instance = new Listener()
			console.log(chalk.magenta('- Connected'))
		}
		return Listener.instance
	}
	
	clearCount() {
		this.count = 0
	}
	
	increment() {
		this.count++
	}
}
