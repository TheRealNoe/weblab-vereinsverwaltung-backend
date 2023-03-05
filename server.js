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

server.get(
	"/api/v1/statsAmounts",
	middleware.verifyToken,
	routes.getStatsAmount
);

server.get(
	"/api/v1/getUpcomingEvents",
	middleware.verifyToken,
	routes.getUpcomingEvents
);

server.get("/api/v1/member", middleware.verifyToken, routes.getMembers);

server.get("/api/v1/member/:id", middleware.verifyToken, routes.getMember);

server.post("/api/v1/member", middleware.verifyToken, routes.postMember);

server.put("/api/v1/member/:id", middleware.verifyToken, routes.putMember);

server.delete(
	"/api/v1/member/:id",
	middleware.verifyToken,
	routes.deleteMember
);

server.get("/api/v1/event", middleware.verifyToken, routes.getEvents);

server.get("/api/v1/event/:id", middleware.verifyToken, routes.getEvent);

server.post("/api/v1/event", middleware.verifyToken, routes.postEvent);

server.put("/api/v1/event/:id", middleware.verifyToken, routes.putEvent);

server.delete("/api/v1/event/:id", middleware.verifyToken, routes.deleteEvent);

server.get("/api/v1/resource", middleware.verifyToken, routes.getResources);

server.get("/api/v1/resource/:id", middleware.verifyToken, routes.getResource);

server.post("/api/v1/resource", middleware.verifyToken, routes.postResource);

server.put("/api/v1/resource/:id", middleware.verifyToken, routes.putResource);

server.delete(
	"/api/v1/resource/:id",
	middleware.verifyToken,
	routes.deleteResource
);

server.listen(8000, () => {
	console.log("Backend is running...");
});
