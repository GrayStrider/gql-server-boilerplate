import {range} from 'ramda'
import {of, from, interval, Observable} from 'rxjs'
import {concatMap, delay, endWith, take, map, first} from 'rxjs/operators'
import {consoleWrite} from 'src/utils/libsExport'

const STR = 'Hello, World!'
const ARR = range(0, 9)

of(STR)
	.subscribe(console.log)

from(STR)
	.pipe(
		concatMap(x => of(x).pipe(
			delay(250),
		)),
	)
	.subscribe(consoleWrite)


/**
 * OR bind each value to an interval emit
 */
interval(300)
	.pipe(
		take(STR.length), // limit emits
		map(i => [...STR][i]), // map each emit to corresponding member
		endWith('\nDone!\n'),
	)
	.subscribe(consoleWrite)

export function waitFor<T>(signal: Observable<unknown>) {
	return (source: Observable<T>) =>
		new Observable<T>(observer =>
			signal.pipe(first())
				.subscribe(_ =>
					source.subscribe(observer)
				)
		);
}
