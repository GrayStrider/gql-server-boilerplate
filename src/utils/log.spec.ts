import {warn} from './log'

it(`should print array`, () => {
  warn(["one", "two"])
});

it(`should print multiple arguments on separate line`, () => {
  warn({one: "two"}, "three")
	warn("obne", "two", "three")
});
