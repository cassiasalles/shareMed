require("dotenv-safe").config();
const jwt = require('jsonwebtoken');

module.exports = function verifyJWT(request, response, next) {
    const token = request.query.token;
    const index = blackList.findIndex( item => item === token);
    if (index !== -1) return response.status(401).end();

    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if(err) return response.status(401).end();
        
        next();
    });
};