const mongoose = require('mongoose');

const DocumentSchema = new mongoose.Schema({
    user_id: String,
    album_id: String,
    name: String,
    description: String, 
    create_date: Date,
    reason: String,
    exam_type: String,
    document_id: String
});

module.exports = mongoose.model('Document', DocumentSchema);
