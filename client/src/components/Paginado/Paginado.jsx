import React from 'react';
import './Paginado.css';

export default function Paginado ({dogsPerPage, allDogs, paginado, currentPage}) {
    const pageNumbers = []; // array usado para guardar la cantidad de páginas necesarias

    for (let i=1; i<=Math.ceil(allDogs/dogsPerPage); i++){
        pageNumbers.push(i)
    };

    

    return(
        <nav>
            <ul className='pagination'>
                <div>
                    <button className='backnext1' onClick={currentPage> 1 ? () => paginado(currentPage-1): null}>❮❮</button>
                    {pageNumbers  && pageNumbers.map(number =>(
                        <li>
                        <span onClick={() => paginado(number)}>{number}</span>
                        </li>
                    ))}
                    <button className='backnext2' onClick={currentPage !== pageNumbers.length ?() => paginado(currentPage+1): null}>❯❯</button>
                </div>
            </ul>
        </nav>
    )
}