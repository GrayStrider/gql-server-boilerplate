import {IExecutableSchemaDefinition, makeExecutableSchema} from 'graphql-tools'
import {importSchema} from 'graphql-import'

async function makeSchema<TContext> (schemaPath: string, params: Omit<IExecutableSchemaDefinition, 'typeDefs'>) {
	
	const typeDefs = await importSchema(schemaPath, {})
	return makeExecutableSchema<TContext>({...params, typeDefs})
	
}
export * from '@/graphql/utils/postQuery'

export {makeSchema}
