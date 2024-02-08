
const express = require('express')
const router = express.Router()

router.use(express.urlencoded({ extended: false }))
router.use(express.json())

//crear 8 habs



router.post('/checkin', async (req, res) => {
    try {
        let { dni, numeroHabitacion } = req.body
        let encontrarUsuario = await app.locals.db.collection('clientes').findOne({ dni: dni })

        if (encontrarUsuario.length > 0) {
            let reservado = await app.locals.db.collection('habitaciones').findOneAndUpdate({ numeroHabitacion: numeroHabitacion }, { estado: "ocupado" })
            let reserva = await app.locals.db.collection('reservas').insertOne({ dni: dni, numeroHabitacion: numeroHabitacion })
            res.send({ mensaje: "la habitacion se ha reservado con exito", reserva })
        } else {
            res.send({ mensaje: "el usuario no está registrado", encontrarUsuario })
        }
    } catch (error) {
        res.send({ mensaje: "error al hacer checkin", error })
    }
})



router.get('/checkout/:dni', async (req, res) => {
    try {
        let checkout = await app.locals.db.collection('clientes').findOne({ dni: req.params.dni })
        if (dni.length > 0) {
            let habitacion = await app.locals.db.collection('habitaciones').findOneAndUpdate({ numeroHabitacion: numeroHabitacion }, { estado: "libre" })
            res.send({ mensaje: "checkout con exito", habitacion })
        }
    } catch (error) {
        res.send({ mensaje: "Error al hacer checkout", error })
    }
})


module.exports = router