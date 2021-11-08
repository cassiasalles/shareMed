const Album = require('../models/Album');
const Document = require('./../models/Document');
const mongoose = require('mongoose');

module.exports = {
    async store(request, response) {

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

        if (documentData._id) {
            return response.json({ "success": true, documentData });
        } else {
            return response.json({ "success": false, documentData });
        }

    },

    // listando todos os docs
    // async index(request, response) {
    //     //fazer filtro por id de user
    //     const gfs = await global.gfs;
    //     console.log(gfs);

    //     global.gfs.files.find().clone().toArray((err, files) => {
    //         // check if files 
    //         if (!files || files.length === 0) {
    //             return response.status(404).json({
    //                 err: 'No files exist'
    //             })
    //         }
    //         // files exist            
    //         return response.json(files);
    //     });
    // },


    // listando um doc especifico pelo id fazer dps essa daqui
    async show(request, response) {
        console.log("rota certa")

        const userDocumentList = await Document.find(
            {
                $and: [
                    {
                        user_id: { $eq: request.query.user_id }
                    },
                    {
                        album_id: { $eq: request.query.album_id }
                    }
                ]
            }
        ).clone();
        let documentIdsList = [];

        userDocumentList.forEach(element => {
            documentIdsList.push(mongoose.Types.ObjectId(element.document_id));
        });
        console.log(documentIdsList)

        const gfs = await global.gfs;
        var x = gfs;
        const result = await gfs.files.find(
            { _id: { $in: documentIdsList } }
        ).toArray();
        return response.json(result);
        // fazer tratativa de erro aqui
    },
}