import Redis from 'ioredis'

export const redisSessionClient = makeRedis()
export const publisher = makeRedis()
export const subscriber = makeRedis()

function makeRedis() {
	return new Redis({
		connectTimeout: 2000,
		showFriendlyErrorStack: true,
	})
}
