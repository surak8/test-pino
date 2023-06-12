// https://stackoverflow.com/questions/20606456/whats-the-recommended-way-of-creating-objects-in-nodejs

var RequestComposite = {
	init: function (request) { this.request = request; },
	get: function (url) { return this.request.get(url); }
};
var request = { first: "rik", last: "cousens" };
var comp = Object.create(RequestComposite).init(request);
console.log("here");
