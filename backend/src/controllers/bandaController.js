const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {
    async index(request, response) {
        const bandas = await connection('bandas').select('*');

        return response.json(bandas);
    },

    async create(request, response) {
        const { nome } = request.body;
        const id = crypto.randomBytes(4).toString('HEX');

        await connection('bandas').insert({
            id,
            nome
        });

        return response.json({ id });
    }
};