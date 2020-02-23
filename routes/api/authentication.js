const router = require("express").Router();

const jwt = require('jsonwebtoken');

const secretKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

router.get('/', (req, res) => {
    res.json({
        message: 'Welcome to the API'
    });
});

router.post('/posts', verifyToken, (req, res) => {
    jwt.verify(req.token, secretKey, (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            res.json({
                message: 'Post created...',
                authData
            });
        }
    });
});

router.post('/login', (req, res) => {
    // Mock user
    // req.body.user
    // needs to check sql db for user first!!! then jwt if successful
    const user = {
        email: req.body.email,
        password: req.body.password
    }

    jwt.sign({ user }, secretKey, { expiresIn: '30s', algorithm: 'HS256' }, (err, token) => {
        if (err) {
            res.sendStatus(403)
        } else {
            res.json({
                token
            });
        }

    });
});

// FORMAT OF TOKEN
// Authorization: Bearer <access_token>

// Verify Token
function verifyToken(req, res, next) {
    // Get auth header value
    const bearerHeader = req.headers['authorization'];
    // Check if bearer is undefined
    if (typeof bearerHeader !== 'undefined') {
        // Split at the space
        const bearer = bearerHeader.split(' ');
        // Get token from array
        const bearerToken = bearer[1];
        // Set the token
        req.token = bearerToken;
        // Next middleware
        next();
    } else {
        // Forbidden
        res.sendStatus(403);
    }

}

module.exports = router;