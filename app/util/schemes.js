const memberSchema = {
	type: "object",
	properties: {
		prename: { type: "string", minLength: 2, maxLength: 20 },
		name: { type: "string", minLength: 2, maxLength: 30 },
		birthday: { type: "string", format: "date" },
		street: { type: "string", minLength: 5, maxLength: 40 },
		postcode: { type: "string", minLength: 4, maxLength: 12 },
		city: { type: "string", minLength: 2, maxLength: 30 },
		email: { type: "string", format: "email", maxLength: 40 },
		phone: {
			type: "string",
			minLength: 6,
			maxLength: 15,
			pattern: "\\+?\\d+$",
		},
	},
	required: ["prename", "name", "birthday"],
};

const eventSchema = {
	type: "object",
	properties: {
		name: { type: "string", minLength: 2, maxLength: 30 },
		location: { type: "string", minLength: 2, maxLength: 30 },
		starttime: { type: "string", format: "date-time" },
		endtime: { type: "string", format: "date-time" },
		information: { type: "string", maxLength: 150 },
	},
	required: ["name", "location", "starttime", "endtime"],
};

const resourceSchema = {
	type: "object",
	properties: {
		name: { type: "string", minLength: 2, maxLength: 30 },
		amount: { type: "number", minimum: 0, maximum: 10000000 },
		location: { type: "string", minLength: 2, maxLength: 30 },
		information: { type: "string", maxLength: 150 },
	},
	required: ["name", "amount", "location"],
};

module.exports = { memberSchema, eventSchema, resourceSchema };
