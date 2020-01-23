import {interval} from 'rxjs'
import {take, map, endWith} from 'rxjs/operators'
import {consoleWrite, RD} from 'src/utils/libsExport'

const countdown = (amount: number, every = 1000) =>
	interval(every)
		.pipe(
			take(amount),
			map(value => {
				
				const num = amount - value - 1
				return `${num}${RD.isNotEmpty(num) ? ', ' : ''}`
				
			}),
			endWith('\nDone\n')
		)

countdown(10, 300)
	.subscribe(consoleWrite)

