const fs=require("fs");
const path=require("path");
const pino1=require("pino");

/*
createLogger(options = {}, destination) {
    return pino(
      Object.assign(this.pinoOptions, options),
      destination || pino.destination(path.join(logPath, 'app.log'))
    );
  }
*/

const pkgContent=require(path.join(process.cwd(),"package.json"));
const fname= pkgContent.name+".log";
const outDir=path.resolve( path.join( process.cwd(), "logs", fname));
var dir;

if (!fs.existsSync(dir=path.dirname(outDir))) fs.mkdirSync(dir,{resolve:true});

var p=pino1(	{},	pino1.destination(outDir));
p.fatal("fatal");
