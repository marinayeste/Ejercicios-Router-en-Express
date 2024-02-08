const express = require('express')
const router = express.Router()

router.use(express.urlencoded({ extended: false }))
router.use(express.json())



router.post('/registro', async (req, res) => {
    try {
        let { nombre, apellido, dni } = req.body
        let results = await app.locals.db.collection('clientes').insertOne({ nombre, apellido, dni })
        res.send({ mensaje: "Usuario registrado correctamente", results })
    } catch (error) {
        res.send({ mensaje: "No se ha podido añadir el nuevo usuario", error })
    }
})



router.put('/usuario/:dni', async (req, res) => {
    try {
        let results = await app.locals.db.collection('clientes').updateMany({ dni: req.params.dni }, { nombre: req.body.nombre, apellido: req.body.apellido })
        res.send({ mensaje: 'Usuario actualizado correctamente', results })

    } catch (error) {
        res.send({ mensaje: "No se ha podido actualizar el usuario", error })
    }
})




module.exports = router