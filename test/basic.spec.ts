import {testFoo} from 'test/basic'

describe('should do basic test', () => {
	
	it('should do basic test', () => {
		
		expect.assertions(1)
		expect(testFoo()).toBe(true)
		
	})
	
})
