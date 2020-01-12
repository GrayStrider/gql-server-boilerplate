process.env["NODE_CONFIG_DIR"] = __dirname;

import {get} from 'config'
import {log} from '@/utils/libsExport'

log.info("ENV: " + process.env.NODE_ENV)

export const PORT: string = get('PORT')
export const HOST: string = get('HOST')
export const POSTGRES_URL: string = get('postgres.url')
export const POSTRGRES_URL: string = get('postgres.url')
export const POSTRGRES_PORT: number = get('postgres.port')
export const POSTRGRES_PASSWORD: string = get('postgres.password')
export const POSTRGRES_USERNAME: string = get('postgres.username')
export const POSTRGRES_DATABASE: string = get('postgres.database')
export const GQL_URL: string = `http://${HOST}:${PORT}/graphql`
export const SERVER_URL: string = `http://${HOST}:${PORT}/`
export const dsn: string= get('sentry.dsn')
export const APOLLO_ENGINE_API_KEY: string= process.env.ENGINE_API_KEY ?? 'Apollo API key not found'
export const NODE_ENV = process.env.NODE_ENV


export const routes = () => {
	const base = `http://${HOST}:${PORT}/`
	return {
		users: base + 'users'
	}
}
