export class DBRequestCounterService {

	private static _instance: DBRequestCounterService

	private _count = 0

	get getCount (): number {

		return this._count

	}

	public static connect () {

		if (!DBRequestCounterService._instance)
			DBRequestCounterService._instance = new DBRequestCounterService()

		return DBRequestCounterService._instance

	}

	clearCount () {

		this._count = 0

	}

	increment () {

		this._count += 1

	}

}
