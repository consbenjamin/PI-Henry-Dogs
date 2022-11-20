import React from 'react';
import { Link } from 'react-router-dom';
import './Card.css';
// Al crear dogs en la DB, vienen como array, por lo que tengo que convertirlo en string (como en la API).

export default function Card({id, name, image, weight, temperaments}) {
    let temp = '';

    Array.isArray(temperaments) ?
    temp = temperaments.map(el => {
        return el.name
    }).join(',') : temp = temperaments
    
    return (
        <div className='container'>
            <Link className="card" to={`/home/${id}`}>
                <div className="wrapperImg">
                    <img className="imgDog" src={image} alt={name}/>
                </div>
                <div className="cardText">
                    <h2 className="cardTitle">{name}</h2>
                    <h4 className="cardSub">{weight} kg</h4>
                    <div className="temp-wrapper">
                        <p className="cardTemp">{temperaments}</p>
                    </div>
                </div>
            </Link>
        </div>
    )
}; 