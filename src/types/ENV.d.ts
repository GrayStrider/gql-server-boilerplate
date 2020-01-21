declare namespace NodeJS {
	export interface ProcessEnv {
		/*
		 eslint-disable @typescript-eslint/naming-convention
		 */
		NODE_ENV: 'development' | 'production' | 'test'
		POSTGRES_URL: string
		POSTGRES_PORT: number
	}

}
