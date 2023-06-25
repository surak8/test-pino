//function myFakeStream(afilename) {
//	this.filename = afilename;
//	this.doSomething = function () { console.log("here-1"); };
//	this.doSomethingElse = function (anArg) { console.log(`here-2 : ${anArg || "dummy"}`); };
//}

var myFakeStream = function (afilename) {
	this.filename = afilename;
};

myFakeStream.prototype.doSomething = function () {
	console.log('here-1');
};
myFakeStream.prototype.doSomethingElse = function (anArg) {
	console.log(`here-2 : ${anArg || 'dummy'}`);
};

var v = new myFakeStream('test');
v.doSomething('test-1');
v.doSomethingElse();
v.doSomethingElse('test-2');
console.log('done');
