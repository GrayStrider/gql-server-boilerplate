import * as koa from 'koa'
// KEEP import * as koa from 'koa'

declare module 'koa' {
	interface Context {
		session: session.Session & {
			userId: string | undefined
		} | null
	}
}
