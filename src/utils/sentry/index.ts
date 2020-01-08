import * as Sentry from '@sentry/node'
import {ErrorRequestHandler} from 'express'

export const sentryErrorHandler = Sentry.Handlers.errorHandler({
	shouldHandleError(error: Error): boolean {
		return true
	},
}) as ErrorRequestHandler
