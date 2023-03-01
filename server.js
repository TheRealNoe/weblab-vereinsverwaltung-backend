require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const routes = require("./routes");

const server = express();
server.use(bodyParser.json());
server.use(cors({ origin: "http://localhost:4200" }));

server.get("/member", routes.getMembers);

server.get("/member/:id", routes.getMember);

server.post("/member", routes.postMember);

server.put("/member/:id", routes.putMember);

server.delete("/member/:id", routes.deleteMember);

server.get("/event", routes.getEvents);

server.get("/event/:id", routes.getEvent);

server.post("/event", routes.postEvent);

server.put("/event/:id", routes.putEvent);

server.delete("/event/:id", routes.deleteEvent);

server.get("/resource", routes.getResources);

server.get("/resource/:id", routes.getResource);

server.post("/resource", routes.postResource);

server.put("/resource/:id", routes.putResource);

server.delete("/resource/:id", routes.deleteResource);

server.listen(8000, () => {
	console.log("Backend is running...");
});
