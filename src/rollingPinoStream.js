const fs = require("fs");
const path = require("path");

class RollingPinoStream {
	// #region ctor
	/**
	 * ctor	
	 * @param {object} args 
	 */
	constructor(args) {
		var found = false;

		if (typeof (args) === "string") {
			this._logDirectory = path.dirname(args);
			this._baseName = path.basename(args, path.extname(args));
			found = true;
		} else if (typeof (args) === "object") {
			this._logDirectory = args.logDirectory || path.join(process.cwd(), "logs");
			this._baseName = args.baesLogfilename || this.packageName();
			found = true;
		} else
			this._args = args;
		if (found) {
			this._logfileName = this.createLogfileName();
			console.log(`log-file: ${this.logFilename}`);

		}
	}

	// #endregion ctor

	packageName() {
		const pkgContent = require(path.join(process.cwd(), "package.json"));

		return pkgContent.name || "ERROR";
	}

	extractDateComponents(adate) {
		var dateString;

		if (adate)
			if (typeof (adate) === "string")
				dateString = adate;
			else if (typeof (adate) && adate.constructor && adate.constructor.name === "Date")
				dateString = adate.toString();
		if (dateString)
			return {
				month: dateString.slice(4, 7).toUpperCase(),
				day: dateString.slice(8, 10).toUpperCase(),
				year: dateString.slice(11, 15).toUpperCase()
			};
	}

	extractDateString(adate) {
		var comps = this.extractDateComponents(adate);

		if (comps) return "_" + comps.day + "-" + comps.month + "-" + comps.year + ".log";
	}

	createLogfileName() {
		var date = new Date(Date.now()), fname, dir;

		fname = this.extractDateString(new Date(Date.now()));
		if (!fname) throw new Error("'fname' is null!");
		if ((fs.existsSync(dir = path.dirname(fname)))) fs.mkdirSync(dir, { recursive: true });
		return path.resolve(
			path.join(
				this.logDirectory,
				this.baseLogName + this.extractDateString(date) + ".log"
			)
		);
	}

	// #region properties
	get baseLogName() { return this._baseName; }
	get logDirectory() { return this._logDirectory; }
	get logFilename() { return this._logfileName; }
	get className() { return this.constructor ? (this.constructor.name + ".") : ""; }
	get writable() { return true; }
	// #endregion properties

	// #region class-methods
	log(functionName, data) {
		process.stdout.write(`in ${this.className}${functionName ? functionName : ""}(${this.trim(data)})\r\n`);
	}
	trim(data) { if (data) return data.trim(); }
	write(dataToWrite) { this.log(this.write.name, dataToWrite); }
	// #endregion class-methods
}

module.exports = {
	RollingPinoStream: RollingPinoStream
};
