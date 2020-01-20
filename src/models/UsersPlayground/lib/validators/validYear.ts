import {registerDecorator, ValidationOptions, ValidationArguments} from "class-validator";
import {AnyObject} from 'tsdef'

export function IsValidAge(minAge: number, validationOptions?: ValidationOptions) {
	return function (object: AnyObject, propertyName: string) {
		registerDecorator({
			name: "isLongerThan",
			target: object.constructor,
			propertyName: propertyName,
			constraints: [minAge],
			options: validationOptions,
			validator: {
				validate(value: unknown, args: ValidationArguments) {
					const maxAge = 150
					const [min, max] = args.constraints;
					return  true
				}
			}
		});
	};
}
