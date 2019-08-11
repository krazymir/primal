const keys = require('./keys');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Postgres setup
const { Pool } = require('pg');
const pgClient = new Pool({
    user: keys.pgUser,
    password: keys.pgPassword,
    host: keys.pgHost,
    port: keys.pgPort,
    database: keys.pgDatabase
});

pgClient.on('error', () => console.log('No PG connection'));

pgClient.
query('CREATE TABLE IF NOT EXISTS known_values (numbers INT)').
catch(err => console.log(err));

// Redis setup
const redis = require('redis');
const redisClient = redis.createClient({
    host: keys.redisHost,
    port: keys.redisPort,
    retry_strategy: () => 1000
});
const redisPublisher = redisClient.duplicate();

// Express setup
app.get('/', (req, res)=> {
    res.send('Yellow!');
});

app.get('/values/all', async (req, res)=> {
    const values = await pgClient.query('SELECT numbers FROM known_values');

    res.send(values.rows);
});

app.get('/values/current', async (req, res)=> {
    redisClient.hgetall('values', (err, values) => {
        res.send(values);
    });
});

app.post('/values', async (req, res)=> {
    const index = parseInt(req.body.index);
    if (index > keys.maxIndex || index < 1) {
        return res.status(422).send('Index too ' + (index > keys.maxIndex ? 'high' : 'low'));
    }

    redisClient.hset('values', index, 'Calculating');
    redisPublisher.publish('insert', index);
    pgClient.query('INSERT INTO known_values(numbers) VALUES($1)', [index]);
    res.send({ working: true });
});

app.listen(keys.serverPort, err => {
    console.log(err);
});