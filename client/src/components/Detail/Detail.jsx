import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDetail } from '../../redux/actions';
import { useEffect } from 'react';

export default function Detail(props){
    console.log(props)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getDetail(props.match.params.id));
    },[dispatch])

    const myDog = useSelector((state) => state.detail)

    return (
        <div>
            {
                myDog.length >0 ?
                <div> 
                    <h1>{myDog[0].name}</h1>
                    <img src={myDog[0].img? myDog[0].img : myDog[0].image} alt="" width='500px' height='600px' />
                    <h2>Peso: {myDog[0].weight} kg</h2>
                    <h2>Altura: {myDog[0].height} cm</h2>
                    <h3>Esperanza de vida: {myDog[0].life_span}</h3>
                    <h4>Temperamento: {!myDog[0].createdInDb? myDog[0].temperament + ' ' : myDog[0].temperaments.map(el => el.name + (' '))}</h4>
                </div> : <p>Loading...</p>
            }
            <Link to='/home'>
                <button>Volver</button>
            </Link>
        </div>
    )
}