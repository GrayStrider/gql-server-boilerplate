import {promises} from 'fs'
import {filter, test as regexpTest, isEmpty} from 'ramda'
import {buildSchema, GraphQLSchema} from 'graphql'
import {mergeSchemas} from 'graphql-tools'
import {bb} from '@/utils'

const {readdir, readFile} = promises

const PATH = 'src/graphql/generated/'

async function main (): Promise<GraphQLSchema> {
	
	const files = await readdir(PATH)
		.then(filter(regexpTest(/.graphql$/u)))
	
	if (isEmpty(files)) {

		const defaultSchema = `
        type Query {
            placeholder: String
        }
        
        type Mutation {
        		placeholder: String
        }
		`
		return buildSchema(defaultSchema)
	
	}
	
	const schemas = await bb.map(files,
		async fileName =>
			readFile(PATH + fileName, 'utf8'))
	
	return mergeSchemas({schemas})
	
}


export default main()
	.then(res => res)
