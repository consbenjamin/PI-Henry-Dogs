const { Router } = require('express');
const { getApiInfo } = require('../controllers/controllers');
const {Temperament} = require ('../db');

const router = Router();



/* GET /temperaments:
    obtener todos los temperamentos posibles
    En una primera instancia deberán obtenerlos desde la API externa y guardarlos en su propia base de datos y luego ya utilizarlos desde allí */

router.get('/', async (req, res) => {
    try {
        const temperamentsApi = await getApiInfo();
        const temperaments = temperamentsApi.map(el => el.temperament).join().split(',');
        const temperamentsDb = temperaments.map(el => el.trim());

// itero a través de los temperamentos de la API. 
// busco cada uno, si no está en la DB, le crea una entrada.

        temperamentsDb.forEach(el => {
            if (el) {
                Temperament.findOrCreate({
                    where: { name: el }
                });
            }
        });

        const allTemperaments = await Temperament.findAll();
        res.status(200).send(allTemperaments);

    } catch (error) {
        res.status(404).send(error);
    }

});

module.exports = router;
