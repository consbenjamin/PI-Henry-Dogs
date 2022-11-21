import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getTemperaments, postDog } from '../../redux/actions';

import './Creator.css';

// function validate(input) {
//     let errors = {};
// }

export default function Creator(){
    const dispatch = useDispatch();
    const history = useHistory();
    const temperaments = useSelector((state) => state.temperaments); //me traigo el estado global de temperamentos

    const [input, setInput] = useState({
        name: '',
        height_min: '',
        height_max: '',
        weight_min: '',
        weight_max: '',
        life_span: '',
        image: '',
        temperament: []
    })

    useEffect(() => {
        dispatch(getTemperaments());
    }, [dispatch]);

/////////////////////////////////////////////HANDLERS////////////////////////////////////////////////////////////////////// 

    function handleChange(el){
        setInput({
            ...input,
            [el.target.name] : el.target.value
        })
        console.log(input)
    };

    function handleSelect(el){
        setInput({
            ...input,
            temperament: [...input.temperament,  el.target.value ]                                 
        })
    };

    function handleSubmit(el){
        el.preventDefault();
        console.log(input)
        dispatch(postDog(input))
        alert('Created Dog succesfully!')
        setInput({
            name: '',
            height_min: '',
            height_max: '',
            weight_min: '',
            weight_max: '',
            life_span: '',
            image: '',
            temperament: []
        })
        history.push('/home')
    };

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    return(
        <div>
            <Link to ='/home'><button>Volver</button></Link>
            <h1>Create Dog</h1>
            <form onSubmit={(el) =>handleSubmit(el)}>
                <div>
                    <label>Nombre:</label>
                    <input type="text" value={input.name} name= 'name' placeholder='Nombre' onChange={(el) => handleChange(el)} />
                </div>
                <div>
                    <label>Imagen:</label>
                    <input type="url" value={input.image} name='image' placeholder='Imagen' onChange={(el) => handleChange(el)} />
                </div>
                <div>
                    <label>Altura:</label>
                    <input type="text" value={input.height_min} name='height_min' placeholder='' onChange={(el) => handleChange(el)} />
                    <input type="text" value={input.height_max} name='height_max' placeholder='' onChange={(el) => handleChange(el)} />
                </div>
                <div>
                    <label>Peso:</label>
                    <input type="text" value={input.weight_min} name='weight_min' placeholder='' onChange={(el) => handleChange(el)} />
                    <input type="text" value={input.weight_max} name='weight_max' placeholder='' onChange={(el) => handleChange(el)} />
                </div>
                <div>
                    <label>Esperanza de vida:</label>
                    <input type="text" value={input.life_span} name='life_span' placeholder='' onChange={(el) => handleChange(el)} />
                    {/* <input type="text" value={input.lifeSpanMax} name='lifeSpanMax' placeholder='Maxima' onChange={(el) => handleChange(el)} /> */}
                </div>
                <div>
                    <label>Seleccionelos:</label>
                    <select onChange={e=>handleSelect(e)}>
                        <option disabled selected>Temperamentos</option>
                        {temperaments?.map((el) => {                        
                            return(
                                <option value={el.name}>{el.name}</option>                                
                            )
                        })}
                    </select>
                </div>
                <ul><li>{input.temperament.map(el => el + ' ,')}</li></ul>
                <button type='submit'>Create Dog</button>
            </form>
        </div>
    )
    
}