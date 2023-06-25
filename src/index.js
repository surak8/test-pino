//const fs = require("fs");
const path = require('path');
const pino1 = require('pino');
const { RollingPinoStream } = require('./rollingPinoStream');

function extractPackageName() {
	const pkgContent = require(path.join(process.cwd(), 'package.json'));

	return pkgContent.name || 'ERROR';
}

//function createLogDirectory() {
//	const pkgContent = require(path.join(process.cwd(), "package.json"));
//	const fname = pkgContent.name + ".log";
//	const outDir = path.resolve(path.join(process.cwd(), "logs", fname));
//	var dir;

//	if (!fs.existsSync(dir = path.dirname(outDir)))
//		fs.mkdirSync(dir, { resolve: true });
//	return outDir;
//}

function createLogger(customLogger = false) {
	var opts, logFile, stream;

	opts = {
		level: process.env.PINO_LOG_LEVEL || 'trace',
		formatters: {
			level: (label) => { return { level: label.toUpperCase() }; },
			bindings: (bindings) => { return { host: bindings.hostname }; },
		},
		crlf: true,
		timestamp: () => { return `,"time":"${formatDate(new Date(Date.now()))}"`; }
	};
	if (customLogger) {
		opts.writable = true;
		stream = new RollingPinoStream({
			logDirectory: path.join(process.cwd(), 'logs'),
			baseLogfilename: extractPackageName()

		});
		console.log(`log-file is: ${stream.logFilename}`);
		return pino1(stream);
	}
	else {
		return pino1(opts, pino1.destination(logFile));
	}
}

function formatDate(date) {
	var str = date.toString();

	return str.slice(8, 10) /* day */ +
		'-' +
		str.slice(4, 7).toUpperCase() /* month */ +
		'-' +
		str.slice(11, 15) /* year */ +
		' ' +
		str.slice(16, 24) /* time portion */;

}

// need to figure out how to geneate a transport?

// 8o14.1 is the newest
// need 6.10.0 for ancient versions of what Jason is doing.
/*
need to:
1) nvm use 20.2.0
2) yarn remove pino eslint
3) nvm use 12.3.1
4) yarn add pino@6.10.0

*/

function testLogger(isAbstract = false) {
	var logger = createLogger(isAbstract);

	logger.fatal('fatal');
	logger.error('error');
	logger.warn('warn');
	logger.info('info');
	logger.debug('debug');
	logger.trace('trace');
}

try {
	testLogger(true);
} catch (anException) {
	console.error(anException.message);
	console.error(anException);
}
