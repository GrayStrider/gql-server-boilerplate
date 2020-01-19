import Redis from 'ioredis'

export const redisSessionClient = new Redis()
export const publisher = new Redis()
export const subscriber = new Redis()
