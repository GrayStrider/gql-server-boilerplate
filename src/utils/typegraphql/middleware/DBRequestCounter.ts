import {debounce} from 'lodash'
import {MiddlewareFn} from 'type-graphql'
import {log} from 'src/utils/libsExport'
import {Context} from '@/graphql'
import {DBRequestCounterService} from '@/utils/typegraphql/middleware/DBRequestCounter.service'


const collect = debounce((count) => {
	count > 5
		? log.warn(`Many queries: ${count}`)
		: /*log.info(count)*/ null
	DBRequestCounterService.connect().clearCount()
}, 200)

export const DBRequestCounter: MiddlewareFn<Context> =
	async ({context, args, info, root}, next) => {
		const res = await next()
		// log.debug(`${info.operation.operation}: ${info.fieldName}`)
		const count = DBRequestCounterService.connect().getCount
		if (count) {
			collect(count)
		}
		return res
	}

