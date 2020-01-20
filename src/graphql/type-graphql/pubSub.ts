import {RedisPubSub} from 'graphql-redis-subscriptions'
import {publisher, subscriber} from '@/DB/redis'

/**
 * Paradigm where (citing Wikipedia) senders (publishers) are not programmed to send their messages to specific
 * receivers (subscribers). Rather, published messages are characterized into channels, without knowledge of what (if
 * any) subscribers there may be. Subscribers express interest in one or more channels, and only receive messages that
 * are of interest, without knowledge of what (if any) publishers there are. This decoupling of publishers and
 * subscribers can allow for greater scalability and a more dynamic network topology.
 */
export const pubSub = new RedisPubSub({
	publisher,
	subscriber,
})
