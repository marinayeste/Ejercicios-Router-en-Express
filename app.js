const express = require('express');
const app = express();

let { MongoClient } = require('mongodb')
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

const client = new MongoClient('mongodb://localhost:27017')

async function connectMongo() {
    try {
        await client.connect().then((client) => app.locals.db = client.db('test'));
        console.log("🟢 MongoDB está conectado");
    } catch (error) {
        console.error("🔴 MongoDB no conectado:", error);
    }
}

connectMongo()

const cliente = require('./routes/gestionClientes')

app.use('/cliente', cliente)

const habitaciones = require('./routes/gestionHabitaciones')

app.use('/habitaciones', habitaciones)








app.listen(PORT, (e) => {
    e
        ? console.error("🔴 Express no conectado")
        : console.log("🟢 Express conectado y a la escucha en el puerto: " + PORT)
})