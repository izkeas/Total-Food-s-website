const express = require('express');
const route = express.Router();

// Controllers
const home = require("../controllers/homeController");


route.get("/", home.root);
route.get("/pesquisa/:query?", home.search);


route.get("/items/:item", home.item);

module.exports =route;