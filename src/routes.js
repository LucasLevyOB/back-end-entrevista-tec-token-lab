const express = require("express");
const routes = express.Router();

const user = require("./controllers/user");
const session = require("./controllers/session");
const events = require("./controllers/events");

//user
routes.post("/users", user.create);
routes.get("/users", user.get);

//session
routes.post("/sessions", session.create);

//events
routes.post("/events/:userId", events.create);
routes.get("/events/:userId/:date", events.getByUserId);
routes.get("/events/days/have/:userId", events.getDaysHaveEvents);
routes.put("/events/:eventId", events.update);
routes.delete("/events/:eventId", events.deleteById);

module.exports = routes;
