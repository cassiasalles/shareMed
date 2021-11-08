const Album = require('../models/Album');
const Document = require('./../models/Document');

module.exports = {
    async store(request, response) {
        console.log(request.file);
        console.log(request.body);
        // return response.json({"success": true});

        let { user_id, album_id, name, description, reason, exam_type } = request.body;
        let document_id = request.file.id

        const create_date = new Date();

        let documentData = await Document.create({
            user_id,
            album_id,
            name,
            description,
            create_date,
            reason,
            exam_type,
            document_id
        });

        const album  = await Album.find({
            user_id : {$eq: request.body.user_id }
        }).where().clone();

        

        let albumData = await Album.updateOne({
            
            $push: { document_ids: document_id }
        })
        if (documentData._id) {
            return response.json({ "success": true, documentData });
        } else {
            return response.json({ "success": false, documentData });
        }

    },

    // listando todos os docs
    async index(request, response) {
        const gfs = await global.gfs;
        console.log(gfs);

        global.gfs.files.find(
            // fazer filtro por usuario aqui
            {
                _id: { $in: request.body.user_id }
            }
        ).clone().toArray((err, files) => {
            console.log(files)
            // check if files 
            if (!files || files.length === 0) {
                return response.status(404).json({
                    err: 'No files exist'
                })
            }
            // files exist
            return response.json(files);
        });
    },
}