import React from 'react';
import {Link} from 'react-router-dom';
import './LandingPage.css';
import Imagen from '../../img/dogLanding.jpg';

export default function LandingPage(){

    return(
        <div className='landing'>
                <img className='landingImg' src={Imagen} alt="dogLanding" />
            <div className='landingText'>
                <span className='landingName'>PI DOGS</span>
                <div className='landingWrapper'>
                    <h1 className='landingTitle'>Bienvenidos a mi pagina🐶</h1>
                </div>
                <div className='landingLinks'>
                    <Link className='landingButton' to='/home'>
                        <button>Ingresar</button>
                    </Link>
                </div>
            </div>
        </div>
    )
};
