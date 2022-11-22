import React from 'react';
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getDogs, getTemperaments, filterCreated, filterByTemp, orderByName, orderByWeight } from '../../redux/actions';
import { Link } from 'react-router-dom';
import './Home.css';
import Card from '../Card/Card';
import Paginado from '../Paginado/Paginado';
import SearchBar from '../SearchBar/SearchBar';
import LinkedIn from '../../img/linkedin.png';
import Github from '../../img/github.png';

export default function Home () {
    const dispatch = useDispatch()  //para despachar las acciones con la constante
    const allDogs = useSelector ((state) => state.dogs)
    const temperaments = useSelector((state) => state.temperaments)

    // paginado
    const [order, setOrder] = useState('')  // éste state sólo sirve para re-renderizar el display luego de aplicar un ordenamiento
    const [currentPage, setCurrentPage] = useState(1)
    const [dogsPerPage,setDogsPerPage] = useState(8)
    const indexOfLastDog = currentPage * dogsPerPage // 8
    const indexOfFirstDog = indexOfLastDog - dogsPerPage // 0
    const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog)

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }


    useEffect(() =>{
        dispatch(getDogs())
    },[dispatch])

    useEffect(() =>{
        dispatch(getTemperaments())
    },[dispatch])

    function handleClick(el){
        el.preventDefault();
        dispatch(getDogs());
        setCurrentPage(1)
    }

    function handleFilterTemp(el){
        el.preventDefault();
        dispatch(filterByTemp(el.target.value));
        setCurrentPage(1)
        setOrder(`Ordenado ${el.target.value}`);
    };

    function handleFilterCreated(el){
        el.preventDefault()
        dispatch(filterCreated(el.target.value))
        setCurrentPage(1)
    };

    function handleSortName(el){
        el.preventDefault()
        dispatch(orderByName(el.target.value))
        setCurrentPage(1)
        setOrder(`Ordenado ${el.target.value}`)
    }

    function handleFilterWeight(el) {
        el.preventDefault();
        dispatch(orderByWeight(el.target.value));
        setCurrentPage(1);
        setOrder(`Ordenado ${el.target.value}`);
    }

    // onClick del button 'clearFilter'
    const handleClear = () => {
        dispatch(getDogs());
    }

    return (
        <div className='home'>  
            <div className='navBg'>
                <h1>HENRY DOGS</h1>
                <div className='filterOrder'>
                    <select className='dropdown' onChange={el => handleFilterTemp(el)}>
                        <option disabled selected>Temperamentos:</option>
                        <option value= 'All'>All</option>
                        {temperaments && temperaments.map(el=>{
                            return <option value={el.name}>{el.name}</option>
                        })}
                    </select>
                    <select className='dropdown' onChange={el => handleFilterCreated(el)}>
                        <option disabled selected>Origen:</option>
                        <option value="ALL">Todos</option>
                        <option value="API">Existentes</option>
                        <option value="DB">Creados</option>
                    </select>
                    <select className='dropdown' onChange={el => handleSortName(el)}>
                        <option disabled selected>Orden Alfabetico</option>
                        <option value="asc">Nombre (A-Z)</option>
                        <option value="des">Nombre (Z-A)</option>
                    </select>
                    <select className='dropdown' onChange={el => handleFilterWeight(el)}>
                        <option disabled selected>Orden por peso</option>
                        <option value="min">Peso minimo</option>
                        <option value="max">Peso maximo</option>
                    </select>
                    <button className='clearFilter' onClick={handleClear}>Clear Filter</button>
                    <div className='createDog'>
                    <Link to='/dog'>
                        <button>Crear nueva raza!</button>
                    </Link>
                    </div>
                </div>
                <div className='rightNav'>
                    <div className='search'>
                    </div>
                </div>
                <Paginado
                dogsPerPage={dogsPerPage}
                allDogs={allDogs.length}
                paginado = {paginado}
                currentPage={currentPage}
                />
                <SearchBar handleClick={handleClick}/>
            </div>
                <div className='containerDogs'>
                    {currentDogs?.map((el) => {
                            return (
                                    <Card
                                    key={el.id}
                                    id={el.id}  
                                    name={el.name} 
                                    image={el.image} 
                                    weight={el.weight} 
                                    temperaments={el.temperament ? el.temperament : el.temperaments} 
                                    />
                            )
                        })
                    }
                </div>
            <div className='footer'>
                <div className='credits'>
                    <ul>
                        <li>
                            <span>Constantino Abba, 2022</span>
                        </li>
                        <li>
                            <a href="https://www.linkedin.com/in/constantino-abba-fullstackdev/"><img width='30' height='30' src={LinkedIn} alt="linkedIn" /></a>
                        </li>
                        <li>
                            <a href="https://github.com/consbenjamin"><img width='30' height='30' src={Github} alt="gitHub" /></a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    ) 
}