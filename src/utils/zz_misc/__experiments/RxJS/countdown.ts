import {interval} from 'rxjs'
import {take, map, endWith} from 'rxjs/operators'

const countdown = (amount: number, every: number = 1000) =>
	interval(every)
		.pipe(
			take(amount),
			map(value => {
				const num = amount - value - 1
				return  num + (num ? ', ' : '')
			}),
			endWith("\nDone")
		)

countdown(10, 300)
	.subscribe((r) => process.stdout.write(`${r}`))
