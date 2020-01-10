import {Context} from '@/graphql/apollo/context'
import {Errors} from '@/utils/Errors'
import {MiddlewareFn} from 'type-graphql'
import _ from 'lodash'

export const ErrorHandler: MiddlewareFn<Context> =
	async ({context, args, info, root}, next) => {
		try {
			return await next()
		} catch (e) {
			if (e.routine === '_bt_check_unique') {
				const val = e.detail.match(/Key \("?(\w+)"?\)/)
				if (!(val && val[1])) throw e
				const field = _.truncate(val[1], {length: 10})
				throw new Errors.Validation(
					`${field ?? 'value'} has to be unique`,
					field ? {invalidField: field} : undefined)
			}
			throw e
			
		}
	}
