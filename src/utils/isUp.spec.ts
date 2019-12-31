import {isUp} from './isUp'

it.skip(`should repeat promises`, async () => {
	const res = await Promise.all(
		Array(10).fill(isUp('http://localhost:4000')))
	expect(res).toStrictEqual(Array(10).fill(true))
})
