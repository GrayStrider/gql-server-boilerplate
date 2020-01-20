import {SchemaDirectiveVisitor} from 'apollo-server-express'
import {GraphQLEnumValue, GraphQLField} from 'graphql'

export class DeprecatedDirective extends SchemaDirectiveVisitor {

	public visitFieldDefinition (field: GraphQLField<unknown, unknown>) {

		field.isDeprecated = true
		field.deprecationReason = this.args.reason

	}

	public visitEnumValue (value: GraphQLEnumValue) {

		value.isDeprecated = true
		value.deprecationReason = this.args.reason

	}

}
