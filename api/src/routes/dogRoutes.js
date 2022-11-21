const { Router } = require('express');
const {Dog, Temperament} = require ('../db');
const { getAllDogs } = require('../controllers/controllers.js');

const router = Router();


/* GET /dogs: 
    Obtener un listado de las razas de perro
    Debe devolver solo los datos necesarios para la ruta principal */

/* GET /dogs?name="...":
    obtener un listado de las razas de perro que contengan la palabra ingresada como query parameter
    si no existe ninguna raza de perro mostrar un mensaje adecuado */

router.get('/', async (req,res) => {
    const name = req.query.name
    let dogsTotal = await getAllDogs();
    try {
        if (name) {
            let dogName = await dogsTotal.filter(el => el.name.toLowerCase().includes(name.toLowerCase()));
            dogName.length ? res.status(200).send(dogName) : res.status(404).send('No se encontró una raza que concuerde con tu busqueda.');
        } else res.status(200).send(dogsTotal);
    } catch (error) {
        res.status(404).send('Unexpected error.');
    }
});


/* GET /dogs/{idRaza} 
    obtener el detalle de una raza de perro en particular
    debe traer solo los datos pedidos en la ruta de detalle de raza de perro 
    incluir los temperamentos asociados */

router.get('/:idRaza', async (req, res) => {
    const id = req.params.idRaza;
    const allDogs = await getAllDogs()
    if(id){
        const dogId = await allDogs.filter( el => el.id == id)
        dogId.length?
        res.status(200).json(dogId) :
        res.status(404).json('No se encontró una raza que concuerde con tu busqueda.')
    }
});

/* POST /dogs: 
    recibe los datos recolectados desde el formulario controlado de la ruta de creación de raza de perro por body 
    crea una raza de perro en la base de datos relacionada con sus temperamentos */

router.post('/', async (req,res) => {
    const {
        name, 
        weightMin,
        weightMax,
        heightMin,
        heightMax,
        life_span, 
        temperament, 
        image, 
        createdInDb
    } = req.body;

    try {
    const createDog = await Dog.create ({
        name,
        height: `${heightMin} - ${heightMax}`,
        weight: `${weightMin} - ${weightMax}`,
        life_span: life_span + " years",
        temperament,
        image,
        createdInDb
    });

    const temperamentDb = await Temperament.findAll({
        where: { name: temperament },
    });

    createDog.addTemperament(temperamentDb);
    res.status(200).send('Dog created succesfully!');
    } catch (error) {
        res.status(400).send('Unexpected Error.');
    }
});

module.exports = router;