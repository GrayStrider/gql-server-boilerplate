export class DBRequestCounterService {
	private static instance: DBRequestCounterService
	private count = 0
	
	get getCount(): number {
		return this.count
	}
	
	public static connect() {
		if (!DBRequestCounterService.instance) {
			DBRequestCounterService.instance = new DBRequestCounterService()
		}
		return DBRequestCounterService.instance
	}
	
	clearCount() {
		this.count = 0
	}
	
	increment() {
		this.count += 1
	}
}
