import Redis from 'ioredis'

function makeRedis () {

	const redis = new Redis({
		connectTimeout: 2000,
		showFriendlyErrorStack: true,
	})

	redis.on('error', error => {

		console.error(error)
		// eslint-disable-next-line no-process-exit
		process.exit(1)
		// TODO good practice?

	})

	return redis

}

export const redisSessionClient = makeRedis()
export const publisher = makeRedis()
export const subscriber = makeRedis()

