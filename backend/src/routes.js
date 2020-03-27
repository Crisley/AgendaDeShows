const express = require('express');

const musicaController = require('./controllers/musicaController');
const agendaController = require('./controllers/agendaController');
const sessionController = require('./controllers/SessionController');

const routes = express.Router();

routes.post('/sessions', sessionController.create);

routes.get('/musicas', musicaController.index); 
routes.get('/musicas/:id', musicaController.indexId);
routes.post('/musicas', musicaController.create);
routes.put('/musicas/:id', musicaController.update);

routes.get('/agendas', agendaController.index);
routes.get('/agendas/:id', agendaController.indexId);
routes.post('/agendas', agendaController.create);
routes.put('/agendas/:id', agendaController.update);

module.exports = routes;