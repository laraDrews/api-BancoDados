
import { fastify } from 'fastify'
import cors from '@fastify/cors'
import { DatabasePostgres } from './database-postgres.js'

const servidor = fastify();
const bancoDeDadosPostgres = new DatabasePostgres();

servidor.register(cors, {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
})

servidor.post('/carros', async (request, reply) => {
    const corpo = request.body;
    await bancoDeDadosPostgres.criarCarro(corpo);
    return reply.status(201).send();
})

servidor.get('/carros', async () => {
    const carros = await bancoDeDadosPostgres.listarCarros();
    return carros;
});

servidor.put('/carros/:id', async (request, reply) => {
    const idCarro = request.params.id;
    const corpo = request.body;
    await bancoDeDadosPostgres.atualizarCarro(idCarro, corpo);

    return reply.status(204).send();
})

servidor.delete('/carros/:id', async (request, reply) => {
    const idCarro = request.params.id;
    await bancoDeDadosPostgres.deletarCarro(idCarro);

    return reply.status(204).send();
})

servidor.listen({
    port: 3333
});