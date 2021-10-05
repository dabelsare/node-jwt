const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();

app.use(bodyParser.json());

app.listen(5001, () => {
    console.log('Products service started on port 5001');
});

const products = [
    {
        "name": "A green door",
        "price": 1000,
        "tags": ["home", "green"]
    },
    {
        "name": "A red door",
        "price": 2000,
        "tags": ["home", "red"]
    },
    {
        "name": "A 3D door",
        "price": 3000,
        "tags": ["home", "color"]
    },
    {
        "name": "A window",
        "price": 1500,
        "tags": ["home", "slide"]
    },
];

//fetch products with authentication
// app.get('/products', (req, res) => {
//     res.json(products);
// });

const accessTokenSecret = 'youraccesstokensecret';

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, accessTokenSecret, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }

            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

app.get('/products', authenticateJWT, (req, res) => {
    res.json(products);
});