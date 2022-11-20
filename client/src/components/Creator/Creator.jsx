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
    const temperaments = useSelector((state) => state.temperaments);

    const [input, setInput] = useState({
        name: '',
        height: '',
        weight: '',
        life_span: '',
        // minWeight: '',
        // maxWeight: '',
        // minHeight: '',
        // maxHeight: '',
        // lifeSpanMin: '',
        // lifeSpanMax: '',
        image: '',
        temperament: []
    })

    useEffect(() => {
        dispatch(getTemperaments());
    }, [dispatch]);


    function handleChange(el){
        setInput({
            ...input,
            [el.target.name] : el.target.value  // {key: value} brackets notion pq no conozco el valor de "name"
        })
        console.log(input)
    };

    function handleSelect(el){
        if(input.temperament.includes(el.target.value)){
            setInput({
                ...input,
                temperament: [...input.temperament/*  el.target.value */]                                 
            })
        }else{
            setInput({
                ...input,
                temperament: [...input.temperament, el.target.value]                                 
            })
        }
    };

    function handleSubmit(el){
        el.preventDefault();
        console.log(input)
        dispatch(postDog(input))
        alert('Created Dog succesfully!')
        setInput({
            name: '',
            weight: '',
            height: '',
            life_span: '',
            // minWeight: '',
            // maxWeight: '',
            // minHeight: '',
            // maxHeight: '',
            // lifeSpanMin: '',
            // lifeSpanMax: '',
            image: '',
            temperament: []
        })
        history.push('/home')
    };

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
                    <input type="text" value={input.height} name='height' placeholder='' onChange={(el) => handleChange(el)} />
                    {/* <input type="text" value={input.maxHeight} name='maxHeight' placeholder='Altura maxima' onChange={(el) => handleChange(el)} /> */}
                </div>
                <div>
                    <label>Peso:</label>
                    <input type="text" value={input.weight} name='weight' placeholder='' onChange={(el) => handleChange(el)} />
                    {/* <input type="text" value={input.maxWeight} name='maxWeight' placeholder='Peso maximo' onChange={(el) => handleChange(el)} /> */}
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