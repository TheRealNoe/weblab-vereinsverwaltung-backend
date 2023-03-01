require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const middleware = require("./middleware");
const routes = require("./routes");

const server = express();
server.use(bodyParser.json());
server.use(cors({ origin: "http://localhost:4200" }));

server.post("/api/v1/login", routes.login);

server.get("/api/v1/member", routes.getMembers);

server.get("/api/v1/member/:id", routes.getMember);

server.post("/api/v1/member", routes.postMember);

server.put("/api/v1/member/:id", routes.putMember);

server.delete("/api/v1/member/:id", routes.deleteMember);

server.get("/api/v1/event", routes.getEvents);

server.get("/api/v1/event/:id", routes.getEvent);

server.post("/api/v1/event", routes.postEvent);

server.put("/api/v1/event/:id", routes.putEvent);

server.delete("/api/v1/event/:id", routes.deleteEvent);

server.get("/api/v1/resource", routes.getResources);

server.get("/api/v1/resource/:id", routes.getResource);

server.post("/api/v1/resource", routes.postResource);

server.put("/api/v1/resource/:id", routes.putResource);

server.delete("/api/v1/resource/:id", routes.deleteResource);

server.listen(8000, () => {
	console.log("Backend is running...");
});
