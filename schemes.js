const memberSchema = {
	type: "object",
	properties: {
		prename: { type: "string" },
		name: { type: "string" },
		birthday: { type: "string", format: "date" },
		street: { type: "string" },
		postcode: { type: "number" },
		city: { type: "string" },
		email: { type: "string" },
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
