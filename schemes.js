const memberSchema = {
	type: "object",
	properties: {
		prename: { type: "string", minLength: 2 },
		name: { type: "string", minLength: 2 },
		birthday: { type: "string", format: "date" },
		street: { type: "string", minLength: 5 },
		postcode: { type: "string", minLength: 4 },
		city: { type: "string", minLength: 2 },
		email: { type: "string", format: "email" },
	},
	required: ["prename", "name", "birthday"],
};

const eventSchema = {
	type: "object",
	properties: {
		name: { type: "string", minLength: 2 },
		location: { type: "string", minLength: 2 },
		time: { type: "string", format: "date" },
		duration: { type: "string" },
		information: { type: "string" },
	},
	required: ["name", "location", "time"],
};

const resourceSchema = {
	type: "object",
	properties: {
		name: { type: "string" },
		information: { type: "string" },
		amount: { type: "number" },
		location: { type: "string" },
	},
	required: ["name", "amount"],
};

module.exports = { memberSchema, eventSchema, resourceSchema };
