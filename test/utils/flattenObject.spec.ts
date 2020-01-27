import {flattenObject} from 'src/utils'

describe('flattenObject', () => {

	it(`should return the input
	 when thre's more than 1 key`, async () => {

		expect.assertions(1)
		const input = {foo: 1, bar: 2}
		expect(flattenObject(input)).toStrictEqual(input)
	
	})
	
	it(`should return the value of the first key
	 when there's only one key`, async () => {

		expect.assertions(1)
		const input = {foo: 'bar'}
		expect(flattenObject(input))
			.toStrictEqual(input.foo)
	  
	})

})
