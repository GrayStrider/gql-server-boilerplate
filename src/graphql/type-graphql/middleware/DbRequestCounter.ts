import { debounce } from 'lodash'
import { MiddlewareFn } from 'type-graphql'
import { sig } from '@qdev/utils-ts'
import { Context } from '@/graphql'
import DBRequestCounterService from '@/graphql/type-graphql/middleware/DBRequestCounter.service'


const collect = debounce ((count: number) => {
	
	if (count > 5) sig.warn (`Many queries: ${count}`)
	DBRequestCounterService.connect ().clearCount ()
	
}, 200)

const dbRequestCounter: MiddlewareFn<Context> =
	async ({ args, root, info, context }, next) => {
		
		const res = await next ()
		const count = DBRequestCounterService.connect ().getCount
		if (count > 0) collect (count)
		
		return res
		
	}

export default dbRequestCounter
