import {debounce} from 'lodash'
import {MiddlewareFn} from 'type-graphql'
import {sig} from 'src/utils/libsExport'
import {Context} from '@/graphql'
import {DBRequestCounterService} from '@/utils/typegraphql/middleware/DBRequestCounter.service'


const collect = debounce(count => {

	if (count > 5) sig.warn(`Many queries: ${count}`)
	DBRequestCounterService.connect().clearCount()

}, 200)

export const dbRequestCounter: MiddlewareFn<Context> =
	async ({context, args, info, root}, next) => {

		const res = await next()
		const count = DBRequestCounterService.connect().getCount
		if (count) collect(count)

		return res

	}

