import axios from 'axios'
import {from} from 'rxjs'
import {omit} from 'ramda'

const url = 'https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMake/honda?format=json'

interface GetModelsForMake {
	Count: number,
	Message: string,
	SearchCriteria: string,
	Results: Model[]
}

interface Model {
	Make_ID: number,
	Make_Name: string,
	Model_ID: number,
	Model_Name: string
}

from(axios.get<GetModelsForMake>(url))
	.subscribe(({data}) =>
		console.log(
			omit(['Results'])(data),
		))
