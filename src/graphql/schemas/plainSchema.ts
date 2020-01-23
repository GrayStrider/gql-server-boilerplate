import {ApolloError} from 'apollo-server-errors'
import {Context} from '@/graphql'
import {makeSchema} from '@/graphql/utils/makeSchema'

export const plainSchema = makeSchema<Context>('src/graphql/schemas/plain.graphql',
	{
		resolvers: {
			Query: {
				errorToIgnore: () => {

					throw new ApolloError('IGNORED')

				},

				getCatFact: async (parent, args, context, info) => {

					const {text} = await context.dataSources.catFacts.getFact()
					return text

				},

				hello: (parent, args, context, info) =>
					'Hello, world!',
				// Default resolver
				data: () => ({
					field: 'hi1',
				}),
			},
			Data: {
				fieldCap (args: { field: string }) {

					return args.field.toUpperCase()

				},
			},
		},
	})
