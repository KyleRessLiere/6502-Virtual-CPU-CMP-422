export class Hardware {
	public id: number;
	public name: String;
	private debug: boolean = true;
	public constructor(iD, name) {

		this.id = iD;
		this.name = name;


	}
	//outputs a formatted hexdecimal number
	hexLog(num: number, length: number) {
		let hexOutput = num.toString(16).toUpperCase();
		while (hexOutput.length < length) {
			hexOutput = '0' + hexOutput;
		}
		this.log(hexOutput)
	}


	///logs hardware id and time created
	log(messanger: string) {
		if (this.debug) {
			console.log("[HW - " + this.name + "id:" + this.id + " - " + new Date() + "]: created" + "   " + messanger);
		}
	}
	setDebug(debug) {
		this.debug = debug;
	}



}