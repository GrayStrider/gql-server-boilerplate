import {GraphQLEnumValue, GraphQLField} from 'graphql'
import {SchemaDirectiveVisitor} from 'graphql-tools'

export default class DeprecatedDirective extends SchemaDirectiveVisitor {
	
	public visitFieldDefinition (field: GraphQLField<unknown, unknown>) {
		
		field.isDeprecated = true
		field.deprecationReason = this.args.reason
		
	}
	
	public visitEnumValue (value: GraphQLEnumValue) {
		
		value.isDeprecated = true
		value.deprecationReason = this.args.reason
		
	}
	
}
