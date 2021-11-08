const Album = require('./../models/Album');
const Document = require('./../models/Document');
const jwt = require('jsonwebtoken');

module.exports = {

    // listando no link
    async store(request, response) {
        var secret = process.env.SECRET;        
        const token = jwt.sign(request.body, secret, {expiresIn: 1200});
        return response.json( { "id": request.body.album_id ,token});
    },

    // listando no link
    async show(request, response) {
        const documentsList = await Document.find({
            album_id: { $eq: request.query.id }
        }).clone();
        
        return response.json(documentsList);
    },
}