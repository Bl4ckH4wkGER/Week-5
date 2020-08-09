const { Router, query } = require("express");
const jwt = require('jsonwebtoken');
const router = Router();

const ordersDAO = require('../daos/orders');

// isAuthorized middleware
const isAuthorized = async (req, res, next) => {
    let authHeader = req.headers.authorization;
    if (!authHeader) {
        res.sendStatus(401);
    } else {
        const token = authHeader.split(' ')[1];
        const jwtSecret = process.env.JWT_SECRET;
        const user = jwt.verify(token, jwtSecret, (err, decodedToken) => {
            if (err) {
                res.sendStatus(401);
            } else {
                req.user = decodedToken;
                next()
            }
        })
    }
};

// Create an order
router.post("/", 
    isAuthorized,
    async (req, res, next) => {
        const userId = req.user._id;
        // create actual order here
        res.json({})
});

// Get orders
router.get("/", 
    isAuthorized, 
    async (req, res, next) => {
        if (req.user.roles.includes('admin') ==  true) {
            // get all orders
            const allOrders = await ordersDAO.getAllOrders();
            if (allOrders) {
                res.json(allOrders);
            } else {
                res.sendStatus(404);
            }
        } else {
            // get orders of that user
            const userId = req.user._id;
            const myOrder = await ordersDAO.getMyOrder(userId);
            if (myOrder) {
                res.json(myOrder)
            } else {
                res.sendStatus(404);
            }
        }
    }
);

// Get order by Id
router.get("/:id", 
    isAuthorized, 
    async (req, res, next) => {
        const orderId = req.params.id;
        if (req.user.roles.includes('admin') ==  true) {
            // allow all orderIds, use adminGetOrderId from DAO
            res.json({});
            // const adminOrder = await ordersDAO.adminGetOrderId(orderId);
            // if (adminOrder) {
            //     res.json(adminOrder)
            // } else {
            //     res.sendStatus(404);
            // }
        } else {
            const userId = req.user._id;
            // limit to ordersIds of that user, use userGetOrderId
            res.json({});
            // const userOrder = await ordersDAO.userGetOrderId(userId, orderId);
            // if (userOrder) {
            //     res.json(userOrder)
            // } else {
            //     res.sendStatus(404);
            // }
        }
});

module.exports = router;