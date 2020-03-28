const connection = require('../database/connection');

module.exports = {

    async index(request, response) {
        const banda_id = request.headers.authorization;
        const { page = 1 } = request.query;
        const [count] = await connection('musicas').count();

        const agendas = await connection('agendas')
            .where('banda_id', banda_id)
            .limit(5)
            .offset((page - 1) * 5)
            .select('*');

        response.header('X-Total-Count', count['count(*)']);

        return response.json(agendas);
    },

    async indexId(request, response) {
        const { id } = request.params;
        const banda_id = request.headers.authorization;

        const agenda = await connection('agendas')
            .where('id', id)
            .where('banda_id', banda_id)
            .select('*')
            .first();

        return response.json(agenda);
    },

    async create(request, response) {
        const { data_hora, rua, numero, bairro, cidade, contratante, cache } = request.body;
        const status = "A";
        const banda_id = request.headers.authorization;

        await connection('agendas').insert({
            data_hora,
            rua,
            numero,
            bairro,
            cidade,
            contratante,
            cache,
            status,
            banda_id
        })

        return response.status(200).json('Agenda cadastrada com sucesso');
    },

    async update(request, response) {
        const { id } = request.params;

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
    },

    async delete(request, response) {
        const { id } = request.params;
        const banda_id = request.headers.authorization;

        const agenda = await connection('agendas')
            .where('id', id)
            .select('banda_id')
            .first();

        if (agenda.id != banda_id) {
            return response.status(401).json({ error: 'Acesso Negado' });
        }

        await connection('bandas').where('id', id).delete();

        return response.status(204).send();
    }
}