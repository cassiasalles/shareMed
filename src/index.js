const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes');
global.mongoURI = 'mongodb+srv://sharemedADM:sharemedADM@cluster.flurr.mongodb.net/sharemed?retryWrites=true&w=majority'


// //video file
// const path = require('path');
// const crypto = require('crypto');
// const multer = require('multer');
// const {GridFsStorage} = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');

const app = express();

mongoose.connect(global.mongoURI, { 
    useNewUrlParser: true,
    useUnifiedTopology: true, 
});


//file
const conn = mongoose.createConnection(global.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

conn.once('open', function () {
    //init stream
    global.gfs = Grid(conn.db, mongoose.mongo);
    global.gfs.collection('uploads');
})
//middleware
app.use(bodyParser.json())
app.use(methodOverride('_method'));



// colocar o caminho da aplicação para liberar ou deixar vazio para ser acessado de qualquer uma
app.use(cors('http://localhost:3000'));
app.use(express.json());
app.use(routes);

app.listen(3333);
