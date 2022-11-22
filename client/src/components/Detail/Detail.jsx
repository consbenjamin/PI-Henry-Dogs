import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDetail } from '../../redux/actions';
import { useEffect } from 'react';
import './Detail.css'

export default function Detail(props){
    console.log(props)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getDetail(props.match.params.id));
    },[dispatch, props.match.params.id])

    const myDog = useSelector((state) => state.detail)

    return (
        <div className='backgroundDetail'>
            {myDog.length >0 ?
                <div className='containerDetail'>
                    <div className='left'>
                        <h1 className='titleDetail'>{myDog[0].name}</h1>
                        <img className='imageDetail' src={myDog[0].img? myDog[0].img : myDog[0].image} alt="" />
                    </div>
                    <div className='description'>
                        <div className='descriptionDetail'>
                            <h2 className='dataDetail'>Peso: {myDog[0].weight} kg</h2>
                        </div>
                        <div className='descriptionDetail'> 
                            <h2 className='dataDetail'>Altura: {myDog[0].height} cm</h2>
                        </div>
                        <div className='descriptionDetail'>
                            <h3 className='dataDetail'>Esperanza de vida: {myDog[0].life_span}</h3>
                        </div>
                        <div className='descriptionDetail'>
                            <h4 className='dataDetail'>Temperamento: {!myDog[0].createdInDb? myDog[0].temperament + ' ' : myDog[0].temperaments.map(el => el.name + (' '))}</h4>
                        </div>
                    </div> 
                </div> : <p>Loading...</p>
            }
            <Link to='/home'>
                <button className='buttonHome'>Volver</button>
            </Link>
        </div>
    )
}