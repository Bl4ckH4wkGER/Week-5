const { Router, query } = require("express");
var jwt = require('jsonwebtoken');
const router = Router();

const ordersDAO = require('../daos/orders');
const userDAO = require('../daos/user');

// Create an order
router.post("/", async (req, res, next) => {
});

// Get my orders
router.get("/", async (req, res, next) => {
});

// Get an order
router.get("/:id", async (req, res, next) => {
});

module.exports = router;