const mongoose = require('mongoose');

const AlbumSchema = new mongoose.Schema({
    user_id: String,
    name: String,
    create_date: Date,
    update_date: Date,
    description: String, 
    documents_ids: [Number],
    share_link: String    
});

module.exports = mongoose.model('Album', AlbumSchema);
