import chalk from 'chalk'
import {debounce} from 'lodash'
import {MiddlewareFn} from 'type-graphql'
import {printUncaughtError, withTime} from '../../utils/log'

const collect = debounce((m) => {
	console.log(chalk.yellow(withTime(m)))
	DBRequestCounterService.connect().clearCount()
}, 200, )

export const DBRequestCounter: MiddlewareFn =
	async ({context, args, info, root}, next) => {
		try {
			const res = await next()
			
			const count = DBRequestCounterService.connect().getCount
			
			if (count) {
				collect(count)
			}
			return res
		} catch (e) {
			throw e
			
		}
	}

export class DBRequestCounterService {
	private static instance: DBRequestCounterService
	private count: number = 0
	
	private constructor() {}
	
	get getCount(): number {
		return this.count
	}
	
	public static connect() {
		if (!DBRequestCounterService.instance) {
			DBRequestCounterService.instance = new DBRequestCounterService()
			console.log(chalk.magenta('- Connected'))
		}
		return DBRequestCounterService.instance
	}
	
	clearCount() {
		this.count = 0
	}
	
	increment() {
		this.count++
	}
}
