const connection = require('../database/connection');

module.exports = {

    async index(request, response) {
        const { page = 1 } = request.query;
        const banda_id = request.headers.authorization;
        const [count] = await connection('musicas').count();

        const musicas = await connection('musicas')
            .where('banda_id', banda_id)
            .limit(5)
            .offset((page - 1) * 5)
            .select('*');

        response.header('X-Total-Count', count['count(*)']);

        return response.json(musicas);
    },

    async indexId(request, response) {
        const { id } = request.params;
        const banda_id = request.headers.authorization;

        const musica = await connection('musicas')
            .where('id', id)
            .where('banda_id', banda_id)
            .select('*')
            .first();

        response.json(musica);
    },

    async create(request, response) {
        const { nome, ritmo } = request.body;
        const banda_id = request.headers.authorization;

        await connection('musicas').insert({
            nome,
            ritmo,
            banda_id
        })

        return response.status(200).json('Música cadastrada com sucesso');
    },

    async update(request, response) {
        const { id } = request.params;
        const { nome, ritmo } = request.body;
        const banda_id = request.headers.authorization;

        const musica = await connection('musicas')
            .where('id', id)
            .select('banda_id')
            .first();

        if (musica.banda_id != banda_id) {
            return response.status(401).json({ error: 'Acesso Negado' });
        }

        await connection('musicas')
            .where('id', id)
            .update({
                nome,
                ritmo,
                banda_id
            })

        return response.status(204).send();
    }
}