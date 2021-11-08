const { Router } = require('express');
const UserController = require('./controllers/UserController');
const LoginController = require('./controllers/LoginController');
const LogoutController = require('./controllers/LogoutController');
const SearchController = require('./controllers/SearchController');
const AlbumController = require('./controllers/AlbumController');
const DocumentController = require('./controllers/DocumentController');
const ShareController = require('./controllers/ShareController');
const verifyJWT = require('./utils/verifyJWT');
const verifyJWTShareLink = require('./utils/verifyJWTShareLink');

//video file
const path = require('path');
const crypto = require('crypto');
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
// const Grid = require('gridfs-stream');
// const methodOverride = require('method-override');
// const bodyParser = require('body-parser');

const routes = Router();

global.blackList = [{ fewfw: 4545 }];

routes.get('/', (request, response) => {
    return response.json({ message: 'API IS RUNNING' });
})

routes.post('/login', LoginController.store);
routes.post('/logout', LogoutController.store);

routes.post('/users', UserController.store);
routes.get('/users', verifyJWT, UserController.index);
routes.get('/search', SearchController.index);

routes.post('/album', AlbumController.store);
routes.get('/album', AlbumController.index);

// rota parar gerar o link de compartilhamento
routes.post('/share', ShareController.store);
// rota de compartilhamento
routes.get('/share',verifyJWTShareLink, ShareController.show);


// //create store stream
const storage = new GridFsStorage({
    url: 'mongodb+srv://sharemedADM:sharemedADM@cluster.flurr.mongodb.net/sharemed?retryWrites=true&w=majority',
    file: (req, file) => {
        console.log(req.body)
        return new Promise((resolve, reject) => {
            //criando nome do arquivo e o qtd de caracteres
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                const filename = buf.toString('hex') + path.extname(file.originalname);
                const fileInfo = {                    
                    filename: filename,
                    originalname: file.originalname,
                    bucketName: 'uploads',
                };
                resolve(fileInfo);
            });
        });
    }
});
const upload = multer({ storage });

routes.post('/document', upload.single('document'), DocumentController.store);



routes.get('/documents', (request, response) => {
    var gfs = global.gfs;
    
    gfs.files.find().toArray( (err, files) => {
        console.log(files)
        // check if files 
        if (!files || files.length === 0) {
            return response.status(404).json({
                err: 'No files exist'
            })
        }
        // files exist
        return response.json( files);
    })
});

routes.get('/document', DocumentController.show); 

module.exports = routes;
