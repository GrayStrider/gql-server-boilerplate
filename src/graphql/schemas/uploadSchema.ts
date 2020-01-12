import gql from 'graphql-tag'
import {makeExecutableSchema} from 'graphql-tools'
import {Context} from '@/graphql'

export const uploadSchema = makeExecutableSchema<Context>({
  typeDefs: gql`
      scalar Upload
      type File {
          filename: String!

          mimetype: String!
          encoding: String!
      }
      type Query {
          uploads: [File]
      }
      type Mutation {
          singleUpload(file: Upload!): File!
      }
	`,
	
	resolvers: {
		Query: {
			files: () => {
				// Return the record of files uploaded from your DB or API or filesystem.
			}
		},
		Mutation: {
			async singleUpload(parent, { file }) {
				const { stream, filename, mimetype, encoding } = await file;
				
				// 1. Validate file metadata.
				
				// 2. Stream file contents into cloud storage:
				// https://nodejs.org/api/stream.html
				
				// 3. Record the file upload in your DB.
				// const id = await recordFile( … )
				
				return { filename, mimetype, encoding };
			}
		},
	}
})
