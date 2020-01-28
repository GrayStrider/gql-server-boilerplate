import {of, from, interval, Observable} from 'rxjs'
import {concatMap, delay, endWith, take, map, first} from 'rxjs/operators'
import log from '@/utils/log'
import {consoleWrite} from '@/utils'

const STR = 'Hello, World!'

of(STR)
	.subscribe(log)

from(STR)
	.pipe(concatMap(x => of(x)
		.pipe(delay(250))))
	.subscribe(consoleWrite)


// OR bind each value to an interval emit
interval(300)
	.pipe(
		// Limit emits
		take(STR.length),
		// Map each emit to corresponding member
		map(i => [...STR][i]),
		endWith('\nDone!\n')
	)
	.subscribe(consoleWrite)

function waitFor<T> (signal: Observable<unknown>) {
	
	return (source: Observable<T>) =>
		new Observable<T>(observer =>
			signal.pipe(first())
				.subscribe(x =>
					source.subscribe(observer)))
	
}
