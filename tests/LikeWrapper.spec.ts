import {LikeWrapper} from 'src/DB/typeorm'

describe('likeWrapper', () => {

	it('should wrap string in like expression', async () => {

		expect.assertions(1)
		
		expect(LikeWrapper({foo: 'bar'}, 'foo'))
			.toMatchSnapshot()
	
	})

})
