// https://zetcode.com/javascript/createobject/
const personFactory = (firstName, lastName, email) => {
	return {
		firstName: firstName,
		lastName: lastName,
		email: email,
		info() {
			return `${this.firstName} ${this.lastName}, ` +
				`${this.email}`;
		}
	};
};

let person = personFactory(
	"John", "Doe", "jdoe@example.com");

console.log(person.info());
