// myFakeStream
var myFakeStream = function (afilename) {
	this.filename = afilename;
	this.writable = true;
};

myFakeStream.prototype.write = function (a, b, c) {
	console.log("here-3");
};

module.exports.myFakeStream = myFakeStream;
