import Redis from 'ioredis'

export const redis = new Redis()
export const publisher = new Redis()
export const subscriber = new Redis()
