import {ApolloError} from 'apollo-client'
import gql from 'graphql-tag'
import {makeExecutableSchema} from 'graphql-tools'
import {Context} from '@/graphql'

export const plainSchema = makeExecutableSchema<Context>({
  typeDefs : gql`
      type Data {
          field: String!
          fieldCap(arg: String!, arg2: String!): String!
      }

      type Query {
          hello: String!
          data: Data
          getCatFact: String!
          errorToIgnore: String!

      }
	
	`,
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
			data : () => ({ //default resolver
				field: 'hi1',
			}),
		},
		Data : {
			fieldCap(args: { field: string }) {
				return args.field.toUpperCase()
			},
		},
	},
})
