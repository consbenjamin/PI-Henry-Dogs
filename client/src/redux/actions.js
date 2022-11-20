import axios from 'axios';

export function getDogs(){
    return async function(dispatch){
        const json = await axios.get('http://localhost:3001/dogs'); //Conexion entre el front y el back.
        return dispatch({
            type: 'GET_DOGS',
            payload: json.data
        })
    }
};

export function getTemperaments(){
    return async function(dispatch){
        try {
            const json = await axios.get('http://localhost:3001/temperaments')            
            return dispatch({ 
                type: 'GET_TEMPERAMENTS',
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }
    }
};

export function getByName(name){
    return async function(dispatch){
        try {
            const json = await axios.get(`http://localhost:3001/dogs?name=${name}`)
            return dispatch({
                type: 'GET_BY_NAME',
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }
    }
};

export function postDog(payload){
    return async function (dispatch){
        const response = await axios.post('http://localhost:3001/dogs', payload)
        console.log(response)
        return response;
    }
};


export function getDetail(id){
    return async function (dispatch){
        try{
            const json = await axios.get('http://localhost:3001/dogs/' + id)
            return dispatch ({
                type: 'GET_DETAILS',
                payload: json.data
            })
        }   catch(error){
            console.log(error)
        } 
    }
};

export function filterCreated(payload){
    return{
        type: 'FILTER_CREATED',
        payload
    }
};

export function filterByTemp(payload){
    return{
        type: 'FILTER_BY_TEMP',
        payload
    }
};

export function orderByName(payload){
    return{
        type: 'ORDER_BY_NAME',
        payload
    }
};

export function orderByWeight(payload){
    return{
        type: 'ORDER_BY_WEIGHT',
        payload
    }
};

