import {registerDecorator, ValidationOptions, ValidationArguments} from "class-validator";

export function IsValidAge(minAge: number, validationOptions?: ValidationOptions) {
	return function (object: Object, propertyName: string) {
		registerDecorator({
			name: "isLongerThan",
			target: object.constructor,
			propertyName: propertyName,
			constraints: [minAge],
			options: validationOptions,
			validator: {
				validate(value: any, args: ValidationArguments) {
					const maxAge = 150
					const [min, max] = args.constraints;
					return  true
				}
			}
		});
	};
}
