import {promises as fs} from 'fs'
import {join} from 'path'
import makeSchema from './../../src/graphql/utils/makeSchema'


describe('make schema', () => {

	const foo = false ?? true
	it('should create schema', async () => {

		expect.assertions(1)
		const schema = `
    type Query {
      foo: String
    }
    `
		const path = join(__dirname, 'schema.graphql')
		await fs.writeFile(path, schema)
  
		const res = await makeSchema(path, {})
		expect(res).toMatchSnapshot()
		await fs.unlink(path)
	
	})
 
})
