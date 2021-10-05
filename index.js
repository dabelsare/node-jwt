const express = require('express');
const app = express();

app.listen(5000, () => {
    console.log('JWT Authentication service started on port: 5000');
});

const users = [
    {
        username: 'adminuser',
        password: 'admin123',
        role: 'admin'
    }, {
        username: 'dipak',
        password: 'dipak123',
        role: 'member'
    }
];

const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

app.use(bodyParser.json());

const accessTokenSecret = 'youraccesstokensecret';

app.post('/login', (req, res) => {
    // Read username and password from request body
    const { username, password } = req.body;

    // Filter user from the users array by username and password
    const user = users.find(u => { return u.username === username && u.password === password });

    if (user) {
        // Generate an access token
        const accessToken = jwt.sign({ username: user.username,  role: user.role }, accessTokenSecret);

        res.json({
            accessToken
        });
    } else {
        res.send('Username or password incorrect...');
    }
});