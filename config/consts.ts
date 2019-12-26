process.env["NODE_CONFIG_DIR"] = __dirname;

import {get} from 'config'

export const PORT: string = get('PORT')
export const HOST: string = get('HOST')
export const POSTGRES_URL: string = get('postgres.url')
export const POSTRGRES_URL: string = get('postgres.url')
export const POSTRGRES_PORT: number = get('postgres.port')
export const POSTRGRES_PASSWORD: string = get('postgres.password')
export const POSTRGRES_USERNAME: string = get('postgres.username')
export const POSTRGRES_DATABASE: string = get('postgres.database')
