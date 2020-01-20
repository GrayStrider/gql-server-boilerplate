import {Errors} from '@/utils/Errors'
import {MiddlewareFn} from 'type-graphql'
import _ from 'lodash'
import {Context} from '@/graphql'

export const ErrorHandler: MiddlewareFn<Context> =
	async ({context, args, info, root}, next) => {

		try {

			return await next()

		} catch (err) {

			if (err.routine === '_bt_check_unique') {

				const val = err.detail.match(/Key \("?\w+"?\)/u)
				if (!(val && val[1])) throw err
				const field = _.truncate(val[1], {length: 10})
				throw new Errors.Validation(`This ${field ?? 'value'} already exists`,
					field ? {invalidField: field} : undefined)

			}
			throw err

		}

	}
