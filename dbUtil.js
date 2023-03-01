const mongoClient = require("mongodb").MongoClient;

module.exports = {
	async connectToDB(callback) {
		let client;

		try {
			client = await mongoClient.connect(process.env.MONGODB_CONN_STRING);
			db = client.db(process.env.MONGODB_NAME);
			await callback(db);
		} catch (err) {
			console.log(err);
			await callback(db, err);
		}
	},
};
