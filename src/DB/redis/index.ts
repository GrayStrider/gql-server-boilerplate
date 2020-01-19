import Redis from 'ioredis'

export const redisSessionClient = makeRedis()
export const publisher = makeRedis()
export const subscriber = makeRedis()

function makeRedis() {
	const redis = new Redis({
		connectTimeout: 2000,
		showFriendlyErrorStack: true,
	})
	
	redis.on('error', (error) => {
		console.error(error)
		process.exit(1)
	})
	
	return redis
}
