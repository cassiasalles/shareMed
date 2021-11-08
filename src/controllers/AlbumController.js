const Album = require('./../models/Album');
const Document = require('./../models/Document');

module.exports = {
    async store(request, response) {
        let {user_id, name, description} = request.body;
        
        const create_date =  new Date();
    
            let album = await Album.create({
                user_id,
                name,
                create_date,
                description
            });
            if (album._id){
                return response.json({"success": true, album});
            } else {
                return response.json({"success": false, album});
            }
        
    },
    
    async index(request, response) {
        console.log(request.body)
        const albums  = await Album.find({
            user_id : {$eq: request.body.user_id }
        }).clone();
        console.log(albums)
        return response.json(albums);
    },


    

    // async update(request, response) {
    //     // editar location, convenio e doenças do user
    // },
}