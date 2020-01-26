import {mocked} from 'ts-jest/utils'
import foo from 'test/examples/ts-jest.mock'

jest.mock('test/examples/ts-jest.mock')

const mockedFoo = mocked(foo, true)

describe('tests mock helper', () => {

	it('deep', async () => {

		expect.assertions(1)
		// There will be no TS error here, and you'll have completion in modern IDEs
		mockedFoo.ap.bp.cp.hello('me')
		// Same here
		expect(mockedFoo.ap.bp.cp.hello.mock.calls).toHaveLength(1)
	
	})
	
	it('direct', async () => {

		expect.assertions(1)
		foo.name()
		// Here only foo.name is mocked (or its methods if it's an object)
		expect(mocked(foo.name).mock.calls).toHaveLength(1)
	
	})

})
