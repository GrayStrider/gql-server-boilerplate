declare module 'koa' {
	interface Context {
		session: session.Session & {
			userId: string | undefined
		} | null
	}
}
