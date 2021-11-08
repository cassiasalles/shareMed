const User = require("../models/User");

module.exports = {
    async index(request, response){
        const { latitude, longitude, fk_medical_agreement } = request.query;

        const users = await User.find({
            // filtro para convenio
            fk_medical_agreement: {
                $in: fk_medical_agreement,
            },
            // filtro para localização
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude],
                    },
                    // filtro de 10km do ponto
                    $maxDistance: 10000,
                },
            }
        });

        return response.json({"success": true, users})
    }
}