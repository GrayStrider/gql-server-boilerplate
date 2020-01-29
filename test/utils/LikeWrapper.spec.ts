import {LikeWrapper} from 'src/DB/typeorm'

describe('likeWrapper', () => {

	it('should wrap string in like expression', async () => {

		expect.assertions(1)
	
		const snapshot = `
      Object {
        "foo": FindOperator {
          "_multipleParameters": false,
          "_type": "like",
          "_useParameter": true,
          "_value": "%bar%",
        },
      }
    `
		expect(LikeWrapper({foo: 'bar'}, 'foo'))
			.toMatchInlineSnapshot(snapshot)
	
	})

})
