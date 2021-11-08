const mongoose = require('mongoose');
const PointSchema = require('./utils/PointSchema');

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String, 
    cpf: String,
    birth_date: Date,
    sign_in_date: Date,
    admin: Boolean,
    fk_medical_agreement: Number,
    fk_illness: [Number],
    location: {
        type: PointSchema,
        index: '2dsphere'
    }
});

module.exports = mongoose.model('User', UserSchema);
