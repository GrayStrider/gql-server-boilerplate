import {debounce} from 'lodash'
import {MiddlewareFn} from 'type-graphql'
import {sig} from '../../utils/log'


const collect = debounce((count) => {
	count > 5
		? sig.warn(`Many queries: ${count}`)
		: sig.info(count)
	DBRequestCounterService.connect().clearCount()
}, 200,)

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
