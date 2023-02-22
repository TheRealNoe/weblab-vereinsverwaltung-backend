require("dotenv").config();
const express = require("express");
const cors = require("cors");

const bodyParser = require("body-parser");
const Ajv = require("ajv");
const addFormats = require("ajv-formats");
const ajv = new Ajv();
addFormats(ajv);
const { memberSchema, eventSchema, resourceSchema } = require("./schemes.js");

const mongoClient = require("mongodb").MongoClient;
const { ObjectId } = require("mongodb");

function main() {
	let server = express();

	server.use(bodyParser.json());
	server.use(cors({ origin: "http://localhost:4200" }));

	server.get("/member", async (req, res) => {
		const client = await mongoClient.connect(
			process.env.MONGODB_CONN_STRING
		);
		const db = client.db(process.env.MONGODB_NAME);
		const collection = db.collection("member");
		const result = await collection.find({}).toArray();
		res.send(result);
		res.end();
	});

	server.get("/member/:id", async (req, res) => {
		const client = await mongoClient.connect(
			process.env.MONGODB_CONN_STRING
		);
		const db = client.db(process.env.MONGODB_NAME);
		const collection = db.collection("member");
		const result = await collection.findOne({
			_id: new ObjectId(req.params.id),
		});

		if (result) {
			res.send(result);
		} else {
			res.status(404);
		}

		res.end();
	});

	server.post("/member", async (req, res) => {
		const dataValid = ajv.validate(memberSchema, req.body);

		if (dataValid) {
			console.log("valid");
			const client = await mongoClient.connect(
				process.env.MONGODB_CONN_STRING
			);
			const db = client.db(process.env.MONGODB_NAME);
			const collection = db.collection("member");
			await collection.insertOne(req.body);

			res.status(201);
		} else {
			console.log("invalid");
			res.status(400);
		}

		res.end();
	});

	server.get("/event", async (req, res) => {
		const client = await mongoClient.connect(
			process.env.MONGODB_CONN_STRING
		);
		const db = client.db(process.env.MONGODB_NAME);
		const collection = db.collection("event");
		const result = await collection.find({}).toArray();
		res.send(result);
		res.end();
	});

	server.get("/event/:id", async (req, res) => {
		const client = await mongoClient.connect(
			process.env.MONGODB_CONN_STRING
		);
		const db = client.db(process.env.MONGODB_NAME);
		const collection = db.collection("event");
		const result = await collection.findOne({
			_id: new ObjectId(req.params.id),
		});

		if (result) {
			res.send(result);
		} else {
			res.status(404);
		}

		res.end();
	});

	server.post("/event", async (req, res) => {
		const dataValid = ajv.validate(eventSchema, req.body);

		if (dataValid) {
			console.log("valid");
			const client = await mongoClient.connect(
				process.env.MONGODB_CONN_STRING
			);
			const db = client.db(process.env.MONGODB_NAME);
			const collection = db.collection("event");
			await collection.insertOne(req.body);

			res.status(201);
		} else {
			console.log("invalid");
			res.status(400);
		}

		res.end();
	});

	server.get("/resource", async (req, res) => {
		const client = await mongoClient.connect(
			process.env.MONGODB_CONN_STRING
		);
		const db = client.db(process.env.MONGODB_NAME);
		const collection = db.collection("resource");
		const result = await collection.find({}).toArray();
		res.send(result);
		res.end();
	});

	server.get("/resource/:id", async (req, res) => {
		const client = await mongoClient.connect(
			process.env.MONGODB_CONN_STRING
		);
		const db = client.db(process.env.MONGODB_NAME);
		const collection = db.collection("resource");
		const result = await collection.findOne({
			_id: new ObjectId(req.params.id),
		});

		if (result) {
			res.send(result);
		} else {
			res.status(404);
		}

		res.end();
	});

	server.post("/resource", async (req, res) => {
		const dataValid = ajv.validate(resourceSchema, req.body);

		if (dataValid) {
			console.log("valid");
			const client = await mongoClient.connect(
				process.env.MONGODB_CONN_STRING
			);
			const db = client.db(process.env.MONGODB_NAME);
			const collection = db.collection("resource");
			await collection.insertOne(req.body);

			res.status(201);
		} else {
			console.log("invalid");
			res.status(400);
		}

		res.end();
	});

	server.listen(8000, () => {
		console.log("Backend is running....");
	});
}

main();
