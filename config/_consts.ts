process.env['NODE_CONFIG_DIR'] = __dirname
process.env['ALLOW_CONFIG_MUTATIONS'] = 'true'

import {get} from 'config'
import {log} from '@/utils/libsExport'

log.info('ENV: ' + process.env.NODE_ENV)

export const PORT: string = get('PORT')
export const HOST: string = get('HOST')
export const POSTGRES_URL: string = process.env.POSTGRES_URL ?? get('postgres.url')
export const POSTRGRES_PORT: number = process.env.POSTGRES_PORT ?? get('postgres.port')
export const POSTRGRES_PASSWORD: string = process.env.POSTRGRES_PASSWORD ?? get('postgres.password')
export const POSTRGRES_USERNAME: string = process.env.POSTRGRES_USERNAME ?? get('postgres.username')
export const POSTRGRES_DATABASE: string = process.env.POSTRGRES_DATABASE ?? get('postgres.database')
export const GQL_URL: string = `http://${HOST}:${PORT}/${process.env.endpoint ?? 'graphql'}`
export const SERVER_URL: string = `http://${HOST}:${PORT}`
// export const DSN: string = process.env.SENTRY_DSN ?? get('sentry.dsn')
export const APOLLO_ENGINE_API_KEY: string = process.env.ENGINE_API_KEY ?? 'Apollo API key not found'
export const NODE_ENV = process.env.NODE_ENV
