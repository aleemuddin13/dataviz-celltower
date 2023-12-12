// src/redux/actions.js
import globeMetadaJSON from '../../datasets/globe_metadata.json'
import pointsJSON from '../../datasets/points.json'

export const fetchCountries = () => {
    return (dispatch) => {
        fetch('../datasets/ne_110m_admin_0_countries.geojson')
            .then(res => res.json())
            .then(data => {
                dispatch({
                    type: 'SET_COUNTRIES',
                    payload: data,
                });
            });
    };
};

export const fetchPoints = () => {
    return (dispatch) => {
        fetch('../datasets/points.json')
            .then(res => res.json())
            .then(data => {
                dispatch({
                    type: 'SET_POINTS',
                    payload: data,
                });
            });
    };
};

export const setAltitude = (altitude) => ({
    type: 'SET_ALTITUDE',
    payload: altitude,
});

export const setTransitionDuration = (duration) => ({
    type: 'SET_TRANSITION_DURATION',
    payload: duration,
});

function getRandomElementsFromArray(array, n) {
    // Clone the original array to avoid modifying it
    const shuffledArray = [...array];
    let currentIndex = shuffledArray.length, randomIndex, temporaryValue;

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // Swap it with the current element.
        temporaryValue = shuffledArray[currentIndex];
        shuffledArray[currentIndex] = shuffledArray[randomIndex];
        shuffledArray[randomIndex] = temporaryValue;
    }

    // Return the first n elements from the shuffled array
    return shuffledArray.slice(0, n);
}

// src/redux/reducer.js
const initialState = {
    countries: globeMetadaJSON,
    points: pointsJSON,
    // points: pointsJSON,
    altitude: 0.1,
    transitionDuration: 1000,
};

export const globeReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_COUNTRIES':
            const newCountries = JSON.parse(JSON.stringify(action.payload));
            return { ...state, countries: newCountries };
        case 'SET_POINTS':
            const newPoints = JSON.parse(JSON.stringify(action.payload));
            return { ...state, points: newPoints };
        case 'SET_ALTITUDE':
            return state
            // return { ...state, altitude: action.payload };
        case 'SET_TRANSITION_DURATION':
            return { ...state, transitionDuration: action.payload };
        default:
            return state;
    }
};
