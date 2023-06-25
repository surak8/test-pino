// https://stackoverflow.com/questions/20606456/whats-the-recommended-way-of-creating-objects-in-nodejs

// Constructor & Properties Object (Using option A)
var UserData = function (request) {

	var name, age;
	// Constructor
	if (request.name)
		//var name = request.name;
		name = request.name;
	else
		//var name = "Not Available";
		name = 'Not Available';

	if (request.age)
		//var age = request.age;
		age = request.age;
	else
		//var age = null;
		age = null;

	// Return properties
	return {
		userName: name,
		userAge: age
	};

};

// Object methods (Using Option B)
var Adults = {

	printName: function (instance) { // Read propery example
		console.log('Mr. ' + instance.userName);
	},

	changeName: function (instance, newName) { // Write property example
		instance.userName = newName;
	},

	foo: function () {
		console.log('foo');
	}

};
// Object methods (Using Option B)
var Children = {

	printName: function (instance) {
		console.log('Master ' + instance.userName);
	},

	bar: function () {
		console.log('bar');
	}

};

// Initialize
var userData = UserData({ name: 'Doe', age: 40 });

// Call methods
Adults.printName(userData); // Output 'Mr. Doe'
Children.printName(userData); // Output 'Master Doe'

Adults.foo(); // Output 'foo'
Children.bar(); // Output 'bar'

Adults.changeName(userData, 'John');
Adults.printName(userData); // Output 'Mr. John'
