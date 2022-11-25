import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getByName } from '../../redux/actions';
import './SearchBar.css';

export default function SearchBar (){
    const dispatch = useDispatch();
    const [name, setName] = useState('');

    function handleInputChange(el){
        el.preventDefault()
        setName(el.target.value)
        console.log(name)
    }

    function handleSubmit(el){
        el.preventDefault();
        if (name.length === 0) {
            return alert ('Ingresa un valor para buscar')
        } else {
        dispatch(getByName(name))
        setName('')
        }
    };

    return (
        <div>
            <input
            className='input_search'
            type = 'search'
            placeholder = 'Ingresa raza a buscar...'
            onChange={(el) => handleInputChange(el)} 
            />
            <button className='button_search' type='submit' onClick={(el) => handleSubmit(el)}>Buscar</button>
        </div>
    )





}