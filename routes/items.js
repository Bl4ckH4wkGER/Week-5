const { Router, query } = require("express");
var jwt = require('jsonwebtoken');
const router = Router();

const itemsDAO = require('../daos/items');
const userDAO = require('../daos/user');

// Create
router.post("/", async (req, res, next) => {
});

// Get all items
router.get("/", async (req, res, next) => {
});

// Update an item
router.put("/:id", async (req, res, next) => {
});

module.exports = router;