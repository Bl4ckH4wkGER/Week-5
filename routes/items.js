const { Router, query } = require("express");
const jwt = require('jsonwebtoken');
const router = Router();

const itemsDAO = require('../daos/items');

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

// isAdmin middleware
const isAdmin = async (req, res, next) => {
    if (req.user.roles.includes('admin')) {
        next();
    } else {
        res.sendStatus(403);
    }
};

// Create
router.post("/",
    isAuthorized,
    isAdmin,
    async (req, res, next) => {
        const { title, price } = req.body;
        if (!title || !price){
            res.status(400).send('Title and price are required.')
        } else {
            try {
                const newItem = await itemsDAO.create(title, price);
                res.json(newItem);
            } catch(e) {
                next(e);
            }
        }
    }
);

// Get all items
router.get("/",
    isAuthorized,
    async (req, res, next) => {
        const items = await itemsDAO.getAll();
        if (items) {
            res.json(items);
          } else {
            res.sendStatus(404);
          }
});

// Get by Id
router.get("/:id",
    isAuthorized,
    async (req, res, next) => {
        const itemId = req.params.id;
        const item = await itemsDAO.getById(itemId);
        if (item) {
            res.json(item);
        } else {
            res.sendStatus(404)
        }
    }
);

// Update an item
router.put("/:id", 
    isAuthorized,
    isAdmin,
    async (req, res, next) => {
        const itemId = req.params.id;
        const { price } = req.body;
        const updatedItem = await itemsDAO.updateItem(itemId, price);
        if (updatedItem) {
            res.json(updatedItem)
        } else {
            res.sendStatus(404);
        }
    }
);

// Error handling middleware
router.use(function (error, req, res, next) {
    if (error.message.includes("duplicate key")){
        res.status(409).send('This item already exists.')
    } else {
        res.status(500).send('Something broke! Our fault :(')
    } 
});

module.exports = router;