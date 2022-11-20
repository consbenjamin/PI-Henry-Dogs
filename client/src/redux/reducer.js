// estado inicial de nuestro reducer.
// acá traigo la lista de las razas, los temperamentos


const initialState = {
    dogs: [],
    allDogs: [],
    temperaments: [],
    detail: []

}

function rootReducer (state= initialState, action) {
    switch(action.type) {

        case 'GET_DOGS':
            return {
                ...state,
                dogs: action.payload,
                allDogs: action.payload
            }

        case 'GET_TEMPERAMENTS':
            return {
                ...state,
                temperaments: action.payload
            }

        case 'GET_BY_NAME':
            return {
                ...state,
                dogs: action.payload
            }

        case 'CLEAR_DETAIL':
            return {
                ...state,
                details: []
            }

        case 'POST_DOG':
            return{
                ...state
            }
            
        case 'ORDER_BY_NAME':
            const sortArray = action.payload === 'asc' ? state.dogs.sort(function(a, b){
                if(a.name > b.name) {
                    return 1;
                }
                if(b.name > a.name) {
                    return -1;
                }
                return 0;
            }) :
            state.dogs.sort(function(a, b){
                if(a.name > b.name) {
                    return -1;
                }
                if(b.name > a.name) {
                    return 1;
                }
                return 0;
            })
            return {
                ...state,
                dogs: sortArray
            }

        case "ORDER_BY_WEIGHT":
            let arrByWeight =
            action.payload === "min"
                ? state.dogs.sort((a, b) => {
                    let weightSplitA = a.weight.split(" - ");
                    let weightSplitB = b.weight.split(" - ");
        
                    let weightA = weightSplitA > 0 ? weightSplitA : weightSplitA[0];
                    let weightB = weightSplitA > 0 ? weightSplitB : weightSplitB[0];
        
                    if (Array.isArray(weightA)) {
                        weightA = weightA[0];
                    }
                    if (Array.isArray(weightB)) {
                        weightB = weightB[0];
                    }
                    if (isNaN(weightA)) {
                        weightA = weightB;
                    }
                    if (isNaN(weightB)) {
                        weightB = 0;
                    }
                    return weightA - weightB;
                })
                : //descendente
                state.dogs.sort((a, b) => {
                //split de weight (usamos los menores)
                let weightSplitA = a.weight.split(" - ");
                let weightSplitB = b.weight.split(" - ");
                let weightA = parseInt(weightSplitA[0]);
                let weightB = parseInt(weightSplitB[0]);

                return weightB - weightA;
            });
            return {
                ...state,
                dogs: arrByWeight,
            };


        case 'FILTER_CREATED':
            const createdFilter = action.payload === 'DB' ? state.allDogs.filter(el => el.createdInDb) : state.allDogs.filter(el => !el.createdInDb);
            if(!createdFilter.length){
                alert('Aún no hay razas de perros creadas!')
                return{
                    ...state,
                    dogs: state.allDogs,
                }
            }else{
                return{
                    ...state,
                    dogs: action.payload === 'ALL' ? state.allDogs : createdFilter
                }
            }

        case 'FILTER_BY_TEMP':
            const allDogsState = state.allDogs;
            const tempsFilter = (action.payload === 'All') ? state.allDogs : allDogsState.filter((el) => el.temperament?.includes(action.payload))
            return {
                ...state,
                dogs: tempsFilter,
            };

        case 'GET_DETAILS':
            return{
                ...state,
                detail: action.payload
            }

        default: 
            return state;
    }
}

export default rootReducer;