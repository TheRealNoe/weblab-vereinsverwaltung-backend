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
		name: { type: "string" },
		location: { type: "string" },
		time: { type: "string", format: "date-time" },
		duration: { type: "number" },
		information: { type: "string" },
	},
	required: ["name", "location"],
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
