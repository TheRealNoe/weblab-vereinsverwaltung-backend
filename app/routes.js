const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const dbo = require("./util/db");
const { ObjectId } = require("mongodb");

const Ajv = require("ajv");
const ajv = new Ajv();
const addFormats = require("ajv-formats");
addFormats(ajv);
const {
	memberSchema,
	eventSchema,
	resourceSchema,
} = require("./util/schemes.js");

const moment = require("moment");

module.exports = {
	login: async (req, res) => {
		const { username, password } = req.body;

		if (!(username && password)) {
			res.status(401);
			res.end();
		} else {
			await dbo.connectToDB(async function (db, err) {
				if (!err) {
					let user = await db
						.collection("user")
						.findOne({ username: username });
					if (
						user &&
						(await bcrypt.compare(password, user.password))
					) {
						const token = jwt.sign(
							{ username: user.username },
							process.env.TOKEN_KEY,
							{
								expiresIn: "2h",
							}
						);

						res.status(200).json({
							username: user.username,
							token: token,
						});
					} else {
						res.status(401);
					}
				} else {
					res.status(401);
				}
				res.end();
			});
		}
	},

	getStatsAmount: async (req, res) => {
		dbo.connectToDB(async function (db, err) {
			var collection = db.collection("member");
			const memberCount = await collection.count();

			collection = db.collection("event");
			const eventCount = await collection.count();

			collection = db.collection("resource");
			const resourceCount = await collection.count();

			res.status(200).json({
				amountMembers: memberCount,
				amountEvents: eventCount,
				amountResources: resourceCount,
			});
			res.end();
		});
	},

	getUpcomingEvents: async (req, res) => {
		dbo.connectToDB(async function (db, err) {
			const collection = db.collection("event");
			const result = await collection
				.find({
					endtime: { $gte: moment().format("YYYY-MM-DDTHH:mm:ss") },
				})
				.sort({ endtime: 1 })
				.limit(5)
				.toArray();
			res.status(200).send(result);
			res.end();
		});
	},

	getMembers: async (req, res) => {
		dbo.connectToDB(async function (db, err) {
			const collection = db.collection("member");
			const result = await collection.find({}).toArray();
			res.status(200).send(result);
			res.end();
		});
	},

	getMember: async (req, res) => {
		dbo.connectToDB(async function (db, err) {
			const collection = db.collection("member");

			let result = null;

			try {
				result = await collection.findOne({
					_id: new ObjectId(req.params.id),
				});

				if (result) {
					res.status(200).send(result);
				} else {
					res.status(404);
				}
			} catch (error) {
				res.status(404);
			}

			res.end();
		});
	},

	postMember: async (req, res) => {
		dbo.connectToDB(async function (db, err) {
			const dataValid = ajv.validate(memberSchema, req.body);

			if (dataValid) {
				const collection = db.collection("member");
				await collection.insertOne(req.body);

				res.status(201);
			} else {
				res.status(400);
			}

			res.end();
		});
	},

	putMember: async (req, res) => {
		dbo.connectToDB(async function (db, err) {
			const dataValid = ajv.validate(memberSchema, req.body);

			if (dataValid) {
				const collection = db.collection("member");
				try {
					await collection.findOneAndReplace(
						{
							_id: new ObjectId(req.params.id),
						},
						req.body
					);
				} catch (error) {
					res.status(404);
				}

				res.status(201);
			} else {
				res.status(400);
			}

			res.end();
		});
	},

	deleteMember: async (req, res) => {
		dbo.connectToDB(async function (db, err) {
			const collection = db.collection("member");

			try {
				collection.deleteOne({
					_id: new ObjectId(req.params.id),
				});
				res.status(204);
			} catch (error) {
				res.status(404);
			}
			res.end();
		});
	},

	getEvents: async (req, res) => {
		dbo.connectToDB(async function (db, err) {
			const collection = db.collection("event");
			const result = await collection.find({}).toArray();
			res.status(200).send(result);
			res.end();
		});
	},

	getEvent: async (req, res) => {
		dbo.connectToDB(async function (db, err) {
			const collection = db.collection("event");

			let result = null;

			try {
				result = await collection.findOne({
					_id: new ObjectId(req.params.id),
				});

				if (result) {
					res.status(200).send(result);
				} else {
					res.status(404);
				}
			} catch (error) {
				res.status(404);
			}

			res.end();
		});
	},

	postEvent: async (req, res) => {
		dbo.connectToDB(async function (db, err) {
			const dataValid = ajv.validate(eventSchema, req.body);

			if (dataValid) {
				const collection = db.collection("event");
				await collection.insertOne(req.body);

				res.status(201);
			} else {
				res.status(400);
			}

			res.end();
		});
	},

	putEvent: async (req, res) => {
		dbo.connectToDB(async function (db, err) {
			const dataValid = ajv.validate(eventSchema, req.body);

			if (dataValid) {
				const collection = db.collection("event");

				try {
					await collection.findOneAndReplace(
						{
							_id: new ObjectId(req.params.id),
						},
						req.body
					);
				} catch (error) {
					res.status(404);
				}

				res.status(201);
			} else {
				res.status(400);
			}

			res.end();
		});
	},

	deleteEvent: async (req, res) => {
		dbo.connectToDB(async function (db, err) {
			const collection = db.collection("event");

			try {
				collection.deleteOne({
					_id: new ObjectId(req.params.id),
				});
				res.status(204);
			} catch (error) {
				res.status(404);
			}
			res.end();
		});
	},

	getResources: async (req, res) => {
		dbo.connectToDB(async function (db, err) {
			const collection = db.collection("resource");
			const result = await collection.find({}).toArray();
			res.send(result);
			res.status(200).end();
		});
	},

	getResource: async (req, res) => {
		dbo.connectToDB(async function (db, err) {
			const collection = db.collection("resource");

			let result = null;

			try {
				result = await collection.findOne({
					_id: new ObjectId(req.params.id),
				});

				if (result) {
					res.status(200).send(result);
				} else {
					res.status(404);
				}
			} catch (error) {
				res.status(404);
			}

			res.end();
		});
	},

	postResource: async (req, res) => {
		dbo.connectToDB(async function (db, err) {
			const dataValid = ajv.validate(resourceSchema, req.body);

			if (dataValid) {
				const collection = db.collection("resource");
				await collection.insertOne(req.body);

				res.status(201);
			} else {
				res.status(400);
			}

			res.end();
		});
	},

	putResource: async (req, res) => {
		dbo.connectToDB(async function (db, err) {
			const dataValid = ajv.validate(resourceSchema, req.body);

			if (dataValid) {
				const collection = db.collection("resource");

				try {
					await collection.findOneAndReplace(
						{
							_id: new ObjectId(req.params.id),
						},
						req.body
					);
					res.status(201);
				} catch (error) {
					res.status(404);
				}
			} else {
				res.status(400);
			}

			res.end();
		});
	},

	deleteResource: async (req, res) => {
		dbo.connectToDB(async function (db, err) {
			const collection = db.collection("resource");

			try {
				collection.deleteOne({
					_id: new ObjectId(req.params.id),
				});
				res.status(204);
			} catch (error) {
				res.status(404);
			}
			res.end();
		});
	},
};
