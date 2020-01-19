import {ApolloError} from 'apollo-client'
import {Context} from '@/graphql'
import {makeSchema} from '@/graphql/utils/makeSchema'

export const plainSchema = makeSchema<Context>(
	'src/graphql/schemas/plain.graphql',
	{
		resolvers: {
			Query: {
				errorToIgnore: () => {
					throw new ApolloError({errorMessage: 'IGNORED'})
				},
				
				getCatFact: async (parent, args, context, info) => {
					const {text} = await context.dataSources.catFacts.getFact()
					return text
				},
				
				hello: async (parent, args, context, info) => {
					return 'Hello, world!'
				},
				data: () => ({ //default resolver
					field: 'hi1',
				}),
			},
			Data: {
				fieldCap(args: { field: string }) {
					return args.field.toUpperCase()
				},
			},
		},
	})
