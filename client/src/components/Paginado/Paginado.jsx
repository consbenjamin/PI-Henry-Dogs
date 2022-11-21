import React from 'react';
import './Paginado.css';

export default function Paginado ({dogsPerPage, allDogs, paginado}) {
    const pageNumbers = []

    for (let i=1; i<=Math.ceil(allDogs/dogsPerPage); i++){
        pageNumbers.push(i)
    }

    return(
        <nav>
            <ul className='pagination'>
                {pageNumbers  && pageNumbers.map(number =>(
                    <li>
                    <a onClick={() => paginado(number)}>{number}</a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}