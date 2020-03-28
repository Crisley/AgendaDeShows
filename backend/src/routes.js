const express = require('express');

const musicaController = require('./controllers/musicaController');
const agendaController = require('./controllers/agendaController');
const sessionController = require('./controllers/sessionController');
const bandaController = require('./controllers/bandaController');

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
routes.delete('/agendas/:id', agendaController.delete);

routes.get('/bandas', bandaController.index);
routes.post('/bandas', bandaController.create);

module.exports = routes;