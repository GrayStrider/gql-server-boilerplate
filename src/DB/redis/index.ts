import Redis from 'ioredis'

function makeRedis () {
	
	const redis = new Redis ({
		showFriendlyErrorStack: true
	})
	
	redis.on ('error', error => {
		
		console.error (error)
		// eslint-disable-next-line no-process-exit
		process.exit (1)
	})
	
	return redis
	
}

const redisSessionClient = makeRedis ()
const publisher = makeRedis ()
const subscriber = makeRedis ()

export { redisSessionClient, publisher, subscriber }
