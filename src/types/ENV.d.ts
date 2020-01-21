declare namespace NodeJS {
	export interface ProcessEnv {
		NODE_ENV: 'development' | 'production' | 'test'
		POSTGRES_URL: string
		POSTGRES_PORT: number
	}

}
