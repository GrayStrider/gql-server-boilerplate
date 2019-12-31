process.env["NODE_CONFIG_DIR"] = __dirname;

import {get} from 'config'
import {sig, warn} from '../src/utils/log'
sig.info("ENV: " + process.env.NODE_ENV)
export const PORT: string = get('PORT')
export const HOST: string = get('HOST')
export const POSTGRES_URL: string = get('postgres.url')
export const POSTRGRES_URL: string = get('postgres.url')
export const POSTRGRES_PORT: number = get('postgres.port')
export const POSTRGRES_PASSWORD: string = get('postgres.password')
export const POSTRGRES_USERNAME: string = get('postgres.username')
export const POSTRGRES_DATABASE: string = get('postgres.database')
export const GQL_URL: string = `http://${HOST}:${PORT}/graphql`
export const dsn: string= get('sentry.dsn')
