require("dotenv-safe").config();
const jwt = require('jsonwebtoken');
const { query } = require("../models/utils/PointSchema");
const User = require('./../models/User');
const bcrypt = require('bcrypt');

module.exports = {
    
    async store(request, response) {

        var secret = process.env.SECRET;

        const auth  = await User.find({
            email : {$eq: request.body.email}
        }).clone();

        if(auth && bcrypt.compareSync(request.body.password, auth[0].password)) {
            const token = jwt.sign({auth}, secret, {expiresIn: 1200});
            return response.json( {auth: true, auth, token});
        }

        response.status(401).end();
    }
}