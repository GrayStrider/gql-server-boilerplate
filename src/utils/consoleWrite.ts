export default function consoleWrite (message?: unknown, ...optionalParams: unknown[]) {

	process.stdout.write(`${JSON.stringify(message)}`)
	
	optionalParams.forEach(msg => process.stdout.write(`${JSON.stringify(msg)}`))
	
}
