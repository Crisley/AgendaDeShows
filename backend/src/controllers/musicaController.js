const connection = require('../database/connection');

module.exports = {

    async index(request, response) {
        const { page = 1 } = request.query;

        const [count] = await connection('musicas').count();

        const musicas = await connection('musicas')
            .limit(5)
            .offset((page - 1) * 5)
            .select('*');

        response.header('X-Total-Count', count['count(*)']);
 
        return response.json(musicas);
    },

    async indexId(request, response) {
        const { id } = request.params;
        const musica = await connection('musicas')
            .where('id', id)
            .select('*')
            .first();

        response.json(musica);
    },

    async create(request, response) {
        const { nome, ritmo } = request.body;

        await connection('musicas').insert({
            nome,
            ritmo
        })

        return response.json({ nome, ritmo });
    },

    async update(request, response) {
        const { id } = request.params;
        const { nome, ritmo } = request.body;

        await connection('musicas').where('id', id).update({
            nome,
            ritmo
        })

        return response.status(204).send();
    }
}