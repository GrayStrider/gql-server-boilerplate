import {Errors} from '@/utils/Errors'
import {sig} from '@/utils/libsExport'

function main () {

	throw new Errors.NotFound()

}

try {

	main()

} catch (e) {

	console.error(e)
	sig.error(e)

}
