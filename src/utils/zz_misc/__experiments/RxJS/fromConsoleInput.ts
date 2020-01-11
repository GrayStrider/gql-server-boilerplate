import {fromEvent} from 'rxjs'

/**
 * [Node input]
 * wait for input and console.log it
 */
process.stdin.setEncoding('utf8');
const input = process.openStdin()
fromEvent(input, 'data')
	.subscribe(console.log)
