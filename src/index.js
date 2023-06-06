const fs = require("fs");
const path = require("path");
const pino1 = require("pino");

const pkgContent = require(path.join(process.cwd(), "package.json"));
const fname = pkgContent.name + ".log";
const outDir = path.resolve(path.join(process.cwd(), "logs", fname));
var dir, logger;

if (!fs.existsSync(dir = path.dirname(outDir)))
	fs.mkdirSync(dir, { resolve: true });

function formatDate(date) {
	var str = date.toString();

	return str.slice(8, 10) /* day */ +
		"-" +
		str.slice(4, 7).toUpperCase() /* month */ +
		"-" +
		str.slice(11, 15) /* year */ +
		" " +
		str.slice(16, 24) /* time portion */;

}

var opts;

opts = {
	level: process.env.PINO_LOG_LEVEL || "trace",
	formatters: {
		level: (label) => { return { level: label.toUpperCase() }; },
		bindings: (bindings) => { return { host: bindings.hostname }; },
		//log: (object) => {
		//	var i;

		//	i += 1;
		//}
	},
	//msgPrefix: "blah2",
	crlf: true,
	timestamp: () => { return `,"time":"${formatDate(new Date(Date.now()))}"`; }

};
opts = {
	level: process.env.PINO_LOG_LEVEL || "trace",
	formatters: {
		level: (label) => { return { level: label.toUpperCase() }; },
		bindings: (bindings) => { return { host: bindings.hostname }; },
	},
	crlf: true,
	timestamp: () => { return `,"time":"${formatDate(new Date(Date.now()))}"`; }
};

logger = pino1(opts, pino1.destination(outDir));
logger.fatal("fatal");
logger.error("error");
logger.warn("warn");
logger.info("info");
logger.debug("debug");
logger.trace("trace");
