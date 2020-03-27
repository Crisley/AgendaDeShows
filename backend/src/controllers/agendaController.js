const connection = require('../database/connection');

module.exports = {

    async index(request, response) {
        const agendas = await connection('agendas').select('*');

        return response.json(agendas);
    },

    async indexId(request, response) {
        const { id } = request.params;
        const agenda = await connection('agendas')
            .where('id', id)
            .select('*')
            .first();

        return response.json(agenda);
    },

    async create(request, response) {
        const { data_hora, rua, numero, bairro, cidade, contratante, cache } = request.body;
        let status = "A";

        await connection('agendas').insert({
            data_hora,
            rua,
            numero,
            bairro,
            cidade,
            contratante,
            cache,
            status
        })

        return response.status(200).json('Agenda cadastrada com sucesso');
    },

    async update(request, response) {
        const { id } = request.params;
        console.log(id);
        const { data_hora, rua, numero, bairro, cidade, contratante, cache, status } = request.body;

        await connection('agendas').where('id', id).update({
            data_hora,
            rua,
            numero,
            bairro,
            cidade,
            contratante,
            cache,
            status
        })

        return response.status(204).send();
    }
}