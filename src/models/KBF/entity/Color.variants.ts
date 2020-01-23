import {registerEnumType} from 'type-graphql'

enum ColorValues {
	YELLOW = 'YELLOW', WHITE = 'WHITE', RED = 'RED', GREEN = 'GREEN',
	BLUE = 'BLUE', PURPLE = 'PURPLE', ORANGE = 'ORANGE', CYAN = 'CYAN',
	BROWN = 'BROWN', MAGENTA = 'MAGENTA'
}

registerEnumType(ColorValues, {
	name: 'ColorValues',
})

export default ColorValues
