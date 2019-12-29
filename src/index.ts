import {main} from './server'
import {warn} from './utils/log'


//================================================================================
// Main server module is exposed for use in testing
//================================================================================

main().catch(console.error)

