const { now } = require('mongoose');
const { index } = require('../models/utils/PointSchema');
const { update } = require('./../models/User');
const User = require('./../models/User');
const bcrypt = require('bcrypt');

module.exports = {
    async store(request, response) {
        let { name, email, password, cpf, birth_date, admin, latitude, longitude, fk_medical_agreement, fk_illness} = request.body;
        
        const sign_in_date =  new Date();

        let emailVerify = await User.findOne({email});
        let cpfVerify = await User.findOne({cpf});

        if(!emailVerify && !cpfVerify) {
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            }
            
            password = await bcrypt.hashSync(password, 10);
    
            let user = await User.create({
                name,
                email,
                password,
                cpf,
                admin,
                birth_date,
                sign_in_date,
                location,
                fk_medical_agreement,
                fk_illness
            });
            if (user._id){
                return response.json({"success": true, user});
            } else {
                return response.json({"success": false, user});
            }
        } else {
            return response.json({"success": false, "message": "Email ou CPF já existente na base de dados"})
        }
    },
    
    async index(request, response) {
        const users  = await User.find();

        return response.json(users);
    },

    async update(request, response) {
        // editar location, convenio e doenças do user
    },
}