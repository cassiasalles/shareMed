//video file
const path = require('path');
const crypto = require('crypto');
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');

module.exports = function uploadFile() {
    return new GridFsStorage({ 
        url: 'mongodb+srv://sharemedADM:sharemedADM@cluster.flurr.mongodb.net/sharemed?retryWrites=true&w=majority', 
        document: (req, document) => {
            return new Promise((resolve, reject) => {
                //criando nome do arquivo e o qtd de caracteres
                crypto.randomBytes(16, (err, buf) => {
                    if (err) {
                        return reject(err);
                    }
                    const documentName = buf.toString('hex') + path.extname(document.originalname);
                    const documentInfo = {
                        documentName: documentName,
                        bucketName: 'uploads'
                    };
                    resolve(documentInfo);
                });
            });
        }
    });
}