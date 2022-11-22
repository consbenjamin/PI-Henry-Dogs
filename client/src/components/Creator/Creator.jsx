import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getTemperaments, postDog } from '../../redux/actions';
import LinkedIn from '../../img/linkedin.png';
import Github from '../../img/github.png';

import './Creator.css';

// validador de errores de los inputs
function validate(input) {
    const errors = {};

    if (!input.name) errors.name = 'Name is a required field!';
    else if (input.name.length > 30) errors.name = 'Name must be under 30 characters.';

    if (!input.heightMin) errors.name = 'You must provide a minimum height!';
    else if (input.heightMin < 5) errors.heightMin = 'Minimum height must be greater than 5cm.';
    else if (isNaN(input.heightMin)) errors.heightMin = 'Minimum height must be a number.';

    if (!input.heightMax) errors.name = 'You must provide a maximum height!';
    else if (input.heightMax > 70) errors.heightMax = 'Maximum height cant be greater than 70cm.';
    else if (isNaN(input.heightMax)) errors.heightMax = 'Maximum height must be a number.';

    if (input.heightMin && input.heightMax && parseInt(input.heightMin) >= parseInt(input.heightMax)) errors.heightMax = 'Maximum height must be bigger than minimum';

    if (!input.weightMin) errors.name = 'You must provide a minimum weight!';
    else if (input.weightMin < 1) errors.weightMin = 'Minimum weight must be greater than 1kg.';
    else if (isNaN(input.weightMin)) errors.weightMin = 'Minimum weight must be a number.';

    if (!input.weightMax) errors.name = 'You must provide a maximum weight!';
    else if (input.weightMax > 120) errors.weightMax = 'Maximum weight cant be greater than 120kg.';
    else if (isNaN(input.weightMax)) errors.weightMax = 'Maximum weight must be a number.';

    if (input.weightMin && input.weightMax && parseInt(input.weightMin) >= parseInt(input.weightMax)) errors.weightMax = 'Maximum weight must be bigger than minimum';

    if (input.lifeSpanMin < 3) errors.lifeSpanMin = 'Minimum life span must be bigger than 3 years.';
    else if (input.lifeSpanMin && isNaN(input.lifeSpanMin)) errors.lifeSpanMin = "Minimum life span must be a number.";

    if (input.lifeSpanMax > 30) errors.lifeSpanMax = 'Maximum life span must be less than 30 years.';
    else if (input.lifeSpanMin && isNaN(input.lifeSpanMin)) errors.lifeSpanMin = "Maximum life span must be a number.";

    if (input.lifeSpanMin && ! input.lifeSpanMax) errors.lifeSpanMin = 'Both life spans must be provided!';
    if (! input.lifeSpanMin && input.lifeSpanMax) errors.lifeSpanMax = 'Both life spans must be provided!';

    if (input.lifeSpanMin && input.lifeSpanMax && parseInt(input.lifeSpanMin) >= parseInt(input.lifeSpanMax)) errors.lifeSpanMax = 'Maximum life span must be bigger than minimum.'

    return errors;
};

export default function Creator(){
    const dispatch = useDispatch();
    const history = useHistory();
    const temperaments = useSelector((state) => state.temperaments); //me traigo el estado global de temperamentos desde redux
    
    const [errors, setErrors] = useState({})

    const [input, setInput] = useState({
        name: '',
        heightMin: '',
        heightMax: '',
        weightMin: '',
        weightMax: '',
        lifeSpanMin: '',
        lifeSpanMax: '',
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
        setErrors(validate({
            ...input,
            [el.target.name] : el.target.value
        }))
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
            heightMin: '',
            heightMax: '',
            weightMin: '',
            weightMax: '',
            lifeSpanMin: '',
            lifeSpanMax: '',
            image: '',
            temperament: []
        })
        history.push('/home')
    };

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    return(
        <div className='creator'>
            <div className='nav'>
                <Link to ='/home'><button className='buttonBack'>Volver</button></Link>
            </div>
            <div className='creatorAll'>
                <div className='creatorMenu'>
                    <h1 className='creatorTitle'>Create a Dog 🐶</h1>
                    <div className='allFields'>
                        <form onSubmit={(el) =>handleSubmit(el)}>
                                <div className='areaInicio'>
                                    <div className='wrapperDual'>
                                        <label>Nombre:</label>
                                        <input className='createField' type="text" value={input.name} name= 'name' placeholder='Name' onChange={(el) => handleChange(el)} />
                                        <div>{   input.name === '' ? <a className="errors">*Campo obligatorio</a> :                                
                                                <a className="validations"></a>
                                        }</div>
                                    </div>
                                    <div className='wrapperDual'>
                                        <label>Altura:</label>
                                        <input className='createField' type="text" value={input.heightMin} name='heightMin' placeholder='Min' onChange={(el) => handleChange(el)} />
                                        <label></label>
                                        {   input.name !== '' && input.heightMin === '' ? <a className="errors">{errors.heightMin}</a> :
                                            errors.heightMin ? <a className="errors">{errors.heightMin}</a> :
                                            <a className="validations"></a>
                                        }
                                        <input className='createField' type="text" value={input.heightMax} name='heightMax' placeholder='Max' onChange={(el) => handleChange(el)} />
                                        {   input.heightMin !== '' && input.heightMax==='' ? <a className="errors">{errors.heightMax}</a>
                                            :
                                            errors.heightMax ? <a className="errors">{errors.heightMax}</a>
                                            :
                                            <a className="validations"></a>
                                        }
                                    </div>
                                    <div className='wrapperDual'>
                                        <label>Peso:</label>
                                        <input className='createField' type="text" value={input.weightMin} name='weightMin' placeholder='Min' onChange={(el) => handleChange(el)} />
                                        {   input.weightMax !=='' && input.weightMin==='' ? <a className="errors">{errors.weightMin}</a>
                                            :
                                            errors.weightMin ? <a className="errors">{errors.weightMin}</a>
                                            :
                                            <a className="validations"></a>
                                        }
                                        <label></label>
                                        <input className='createField' type="text" value={input.weightMax} name='weightMax' placeholder='Max' onChange={(el) => handleChange(el)} />
                                        {   input.weightMin !=='' && input.weightMax==='' ? <a className="errors">{errors.weightMax}</a>
                                            :
                                            errors.weightMax ? <a className="errors">{errors.weightMax}</a>
                                            :
                                            <a className="validations"></a>
                                        }
                                    </div>
                                    <div className='wrapperDual'>
                                        <label>Esperanza de vida:</label>
                                        <input className='createField' type="text" value={input.lifeSpanMin} name='lifeSpanMin' placeholder='Min' onChange={(el) => handleChange(el)} />
                                        {   input.lifeSpanMax !=='' && input.lifeSpanMin==='' ? <a className="errors">{errors.lifeSpanMin}</a>
                                            :
                                            errors.lifeSpanMin ? <a className="errors">{errors.lifeSpanMin}</a>
                                            :
                                            <a className="validations"></a>
                                        }
                                        <label></label>
                                        <input className='createField' type="text" value={input.lifeSpanMax} name='lifeSpanMax' placeholder='Max' onChange={(el) => handleChange(el)} />
                                        {   input.lifeSpanMin !=='' && input.lifeSpanMax==='' ? <a className="errors">{errors.lifeSpanMax}</a>
                                            :
                                            errors.lifeSpanMax ? <a className="errors">{errors.lifeSpanMax}</a>
                                            :
                                            <a className="validations"></a>
                                        }
                                    </div>
                                    <div className='wrapperDual'>
                                        <label>Imagen:</label>
                                        <input className='createField' type="url" value={input.image} name='image' placeholder='Image' onChange={(el) => handleChange(el)} />
                                        {input.image !='' && errors.image !='' ? <a className="errors">{errors.image}</a>:''}
                                    </div>
                                    <div className='wrapperDual'>
                                        <label>Temperamentos:</label>
                                        <select className='creatorSelect' onChange={e=>handleSelect(e)}>
                                        <option disabled selected>Temperamentos</option>
                                        {temperaments?.map((el) => {                        
                                            return(
                                                <option value={el.name}>{el.name}</option>                                
                                            )
                                        })}
                                        </select>
                                        <ul><li>{input.temperament.map(el => el + ' ,')}</li></ul>
                                    </div>
                                </div>
                                { //VALIDACION DE ESTADO PARA HABILITAR BOTON
                                input.name ===''|| input.weightMax ===''|| input.weightMax === ''|| input.weightMin ==='' || input.weightMax ===''
                                || input.lifeSpanMin ===''|| input.lifeSpanMax ===''
                                || errors.heightMax || errors.weightMax || errors.weightMin || errors.weightMax || errors.lifeSpanMin
                                || errors.lifeSpanMax || errors.image

                                ||!input.temperament.length ?                        
                            <button disabled onClick={e=>handleSubmit(e)} className='button_block'>
                                <span> Errores en el Fromulario </span>
                            </button>
                            :
                            <button onClick={e=>handleSubmit(e)} className='createButton' type="submit">Create Dog</button>
                                }
                        </form>
                    </div>
                </div>
            </div>
        </div>
        
    )
    
}