const memberSchema = {
	type: "object",
	properties: {
		prename: { type: "string", minLength: 2 },
		name: { type: "string", minLength: 2 },
		birthday: { type: "string", format: "date" },
		street: { type: "string" },
		postcode: { type: "string" },
		city: { type: "string" },
		email: { type: "string" },
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
		name: { type: "string", minLength: 2 },
		amount: { type: "number", minimum: 0, maximum: 10000000 },
		location: { type: "string", minLength: 2 },
		information: { type: "string" },
	},
	required: ["name", "amount", "location"],
};

module.exports = { memberSchema, eventSchema, resourceSchema };
