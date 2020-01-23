import {identity} from 'ramda'
import {Context} from '@/graphql'
import {makeSchema} from '@/graphql/utils'

const uploadSchema = makeSchema<Context>('src/graphql/schemas/upload.graphql', {
	resolvers: {
		Query: {
			files: () => {
				// Return the record of files uploaded from your DB or API or filesystem.
			},
		},
		Mutation: {
			async singleUpload (parent, {file}) {

				const {stream, filename, mimetype, encoding} = await file
				// 1. Validate file metadata.
				identity(stream)

				/*
				 * 2. Stream file contents into cloud storage:
				 * https://nodejs.org/api/stream.html
				 */

				/*
				 * 3. Record the file upload in your DB.
				 * const id = await recordFile( … )
				 */

				return {
					filename,
					mimetype,
					encoding,
				}

			},
		},
	},
})

export default uploadSchema
