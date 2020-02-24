import {MiddlewareFn} from 'type-graphql'
import _ from 'lodash'
import {isEmpty} from 'ramda'
import {Context} from '@/graphql'
import {Errors} from '@/utils'

const ErrorHandler: MiddlewareFn<Context> =
	async ({context, info, root, args}, next) => {
		
		try {
			
			return await next()
			
		}
		catch (err) {
			
			if (err.routine === '_bt_check_unique') {
				
				const val = err.detail.match(/Key \("?\w+"?\)/u)
				if (Boolean(val?.[1])) throw err
				const field = _.truncate(val[1], {length: 10})
				throw new Errors.Validation(
					`This ${isEmpty(field) ? 'value' : field} already exists`,
					isEmpty(field) ? undefined : {invalidField: field}
				)
				
			}
			throw err
			
		}
		
	}

export default ErrorHandler
