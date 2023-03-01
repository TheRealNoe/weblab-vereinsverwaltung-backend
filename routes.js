const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const dbUtil = require("./dbUtil");
const { ObjectId } = require("mongodb");

const Ajv = require("ajv");
const ajv = new Ajv();
const addFormats = require("ajv-formats");
addFormats(ajv);
const { memberSchema, eventSchema, resourceSchema } = require("./schemes.js");

module.exports = {
	login: async (req, res) => {
		const { username, password } = req.body;

		if (!(username && password)) {
			res.send("Invalid Credentials").status(400);
			res.end();
		} else {
			await dbUtil.connectToDB(async function (db, err) {
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

						res.json({
							success: true,
							message: "Authentication successful",
							user: {
								username: user.username,
								token: token,
							},
						}).status(200);
					} else {
						res.json({
							success: false,
							message: "Authentication failed",
						}).status(400);
					}
				} else {
					res.status(400);
				}
				res.end();
			});
		}
	},

	getMembers: async (req, res) => {
		dbUtil.connectToDB(async function (db, err) {
			const collection = db.collection("member");
			const result = await collection.find({}).toArray();
			res.send(result).status(200);
			res.end();
		});
	},

	getMember: async (req, res) => {
		dbUtil.connectToDB(async function (db, err) {
			const collection = db.collection("member");

			let result = null;

			try {
				result = await collection.findOne({
					_id: new ObjectId(req.params.id),
				});

				if (result) {
					res.send(result).status(200);
				} else {
					res.send("Not found").status(404);
				}
			} catch (error) {
				res.send("Not found").status(404);
			}

			res.end();
		});
	},

	postMember: async (req, res) => {
		dbUtil.connectToDB(async function (db, err) {
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
		dbUtil.connectToDB(async function (db, err) {
			const dataValid = ajv.validate(memberSchema, req.body);

			if (dataValid) {
				const collection = db.collection("member");
				await collection.findOneAndReplace(
					{
						_id: new ObjectId(req.params.id),
					},
					req.body
				);

				res.status(201);
			} else {
				res.status(400);
			}

			res.end();
		});
	},

	deleteMember: async (req, res) => {
		dbUtil.connectToDB(async function (db, err) {
			const collection = db.collection("member");

			try {
				collection.deleteOne({
					_id: new ObjectId(req.params.id),
				});
				res.status(204);
			} catch (error) {
				res.send("Not found").status(404);
			}
			res.end();
		});
	},

	getEvents: async (req, res) => {
		dbUtil.connectToDB(async function (db, err) {
			const collection = db.collection("event");
			const result = await collection.find({}).toArray();
			res.send(result).status(200);
			res.end();
		});
	},

	getEvent: async (req, res) => {
		dbUtil.connectToDB(async function (db, err) {
			const collection = db.collection("event");

			let result = null;

			try {
				result = await collection.findOne({
					_id: new ObjectId(req.params.id),
				});

				if (result) {
					res.send(result).status(200);
				} else {
					res.send("Not found").status(404);
				}
			} catch (error) {
				res.send("Not found").status(404);
			}

			res.end();
		});
	},

	postEvent: async (req, res) => {
		dbUtil.connectToDB(async function (db, err) {
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
		dbUtil.connectToDB(async function (db, err) {
			const dataValid = ajv.validate(eventSchema, req.body);

			if (dataValid) {
				const collection = db.collection("event");
				await collection.findOneAndReplace(
					{
						_id: new ObjectId(req.params.id),
					},
					req.body
				);

				res.status(201);
			} else {
				res.status(400);
			}

			res.end();
		});
	},

	deleteEvent: async (req, res) => {
		dbUtil.connectToDB(async function (db, err) {
			const collection = db.collection("event");
			collection.deleteOne({
				_id: new ObjectId(req.params.id),
			});
			res.status(204);
			res.end();
		});
	},

	getResources: async (req, res) => {
		dbUtil.connectToDB(async function (db, err) {
			const collection = db.collection("resource");
			const result = await collection.find({}).toArray();
			res.send(result);
			res.end().status(200);
		});
	},

	getResource: async (req, res) => {
		dbUtil.connectToDB(async function (db, err) {
			const collection = db.collection("resource");

			let result = null;

			try {
				result = await collection.findOne({
					_id: new ObjectId(req.params.id),
				});

				if (result) {
					res.send(result).status(200);
				} else {
					res.status(404);
				}
			} catch (error) {
				res.send("Not found").status(404);
			}

			res.end();
		});
	},

	postResource: async (req, res) => {
		dbUtil.connectToDB(async function (db, err) {
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
		dbUtil.connectToDB(async function (db, err) {
			const dataValid = ajv.validate(resourceSchema, req.body);

			if (dataValid) {
				const collection = db.collection("resource");
				await collection.findOneAndReplace(
					{
						_id: new ObjectId(req.params.id),
					},
					req.body
				);

				res.status(201);
			} else {
				res.status(400);
			}

			res.end();
		});
	},

	deleteResource: async (req, res) => {
		dbUtil.connectToDB(async function (db, err) {
			const collection = db.collection("resource");
			collection.deleteOne({
				_id: new ObjectId(req.params.id),
			});
			res.status(204);
			res.end();
		});
	},
};
