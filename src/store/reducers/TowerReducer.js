// src/features/myFeatureSlice.js
import { createSlice } from '@reduxjs/toolkit';
import statsJSON from '../../datasets/stats.json'

function mapPercentageToRange(percentage, min, max, customScaleFactors) {
    // Ensure the input percentage is within the valid range (0-100)
    percentage = Math.min(100, Math.max(0, percentage));

    // Initialize a default scaling factor
    let scaleFactor = 1;

    // Find the appropriate custom scaling factor for the given percentage range
    for (const [rangeStart, rangeEnd, customFactor] of customScaleFactors) {
        if (percentage >= rangeStart && percentage <= rangeEnd) {
            scaleFactor = customFactor;
            break;
        }
    }

    // Calculate the mapped value using the selected scaling factor
    const mappedValue = min + (max - min) * Math.pow(percentage / 100, scaleFactor);

    return mappedValue;
}

const customScaleFactors1 = [
    [0, 25, 1],   // 0-25% range with scaleFactor 2
    [25, 50, 3],  // 25-50% range with scaleFactor 3
    [50, 75, 4],  // 50-75% range with scaleFactor 4
    [75, 100, 5], // 75-100% range with scaleFactor 5
];

const customScaleFactors2 = [
    [0, 25, 1],   // 0-25% range with scaleFactor 2
    [25, 50, 3],  // 25-50% range with scaleFactor 3
    [50, 75, 4],  // 50-75% range with scaleFactor 4
    [75, 100, 5], // 75-100% range with scaleFactor 5
];

const customScaleFactors3 = [
    [0, 25, 4],   // 0-25% range with scaleFactor 2
    [25, 50, 3],  // 25-50% range with scaleFactor 3
    [50, 75, 2],  // 50-75% range with scaleFactor 4
    [75, 100, 1], // 75-100% range with scaleFactor 5
];
const customScaleFactors4 = [
    [0, 50, 6],   // 0-25% range with scaleFactor 2
    // [25, 50, 6],  // 25-50% range with scaleFactor 3
    [50, 75, 2],  // 50-75% range with scaleFactor 4
    [75, 100, 1], // 75-100% range with scaleFactor 5
];


const customScaleFactors11 = [
    [0, 25, 3],   // 0-25% range with scaleFactor 2
    [25, 50, 2],  // 25-50% range with scaleFactor 3
    [50, 75, 1],  // 50-75% range with scaleFactor 4
    [75, 100, 1], // 75-100% range with scaleFactor 5
];

const customScaleFactors22 = [
    [0, 25, 1],   // 0-25% range with scaleFactor 2
    [25, 50, 1],  // 25-50% range with scaleFactor 3
    [50, 75, 6],  // 50-75% range with scaleFactor 4
    [75, 100, 6], // 75-100% range with scaleFactor 5
];

const customScaleFactors33= [
    [0, 25, 6],   // 0-25% range with scaleFactor 2
    [25, 50, 6],  // 25-50% range with scaleFactor 3
    [50, 75, 6],  // 50-75% range with scaleFactor 4
    [75, 100, 1], // 75-100% range with scaleFactor 5
];
const customScaleFactors44= [
    [0, 25, 1],   // 0-25% range with scaleFactor 2
    [25, 50, 6],  // 25-50% range with scaleFactor 3
    [50, 75, 6],  // 50-75% range with scaleFactor 4
    [75, 100, 6], // 75-100% range with scaleFactor 5
];

const totalStats = {
    total: 0,
    GSM: 0,
    CDMA: 0,
    UMTS: 0,
    LTE: 0
}



for (const name  in statsJSON) {
    const obj = statsJSON[name]
    totalStats.total+= obj.total
    totalStats.GSM += obj.GSM
    totalStats.CDMA += obj.CDMA
    totalStats.UMTS += obj.UMTS
    totalStats.LTE += obj.LTE
}

const radioPer = {
    GSM: (totalStats.GSM/totalStats.total),
    UMTS: (totalStats.UMTS / totalStats.total),
    CDMA: (totalStats.CDMA / totalStats.total),
    LTE: (totalStats.LTE / totalStats.total)
}


const fetchMetrics = (state) => {
    
    let yearPer = 100
    if(state.selectedFloor && state.selectedFloor != 2023){
        yearPer = ((state.selectedFloor - 2009) / 13) * 100
    }
    let towerPer = Math.round((state.towerRange / 10) * 100)
    // yearPer = (yearPer * 0.70) + (Math.round((state.towerRange/10)*100) * 0.30)
    let gsm = mapPercentageToRange(yearPer, 0, totalStats.GSM/2, customScaleFactors1)
    let CDMA = mapPercentageToRange(yearPer, 0, totalStats.CDMA/2, customScaleFactors2)
    let UMTS = mapPercentageToRange(yearPer, 0, totalStats.UMTS/2, customScaleFactors3)
    let LTE = mapPercentageToRange(yearPer, 0, totalStats.LTE/2, customScaleFactors4)

     gsm += mapPercentageToRange(towerPer, 0, totalStats.GSM/2, customScaleFactors22)
     CDMA += mapPercentageToRange(towerPer, 0, totalStats.CDMA/2, customScaleFactors11)
     UMTS += mapPercentageToRange(towerPer, 0, totalStats.UMTS/2, customScaleFactors44)
     LTE += mapPercentageToRange(towerPer, 0, totalStats.LTE/2, customScaleFactors33)

    console.log(`${yearPer} y - ${towerPer} T- ${gsm}`)
    let total = 0
    const metrics = {
        GSM: 0,
        UMTS: 0,
        CDMA: 0,
        LTE: 0
    }
    if(state.enableRadio.GSM){
        total += gsm
    }
    
    if (state.enableRadio.CDMA) {
        total += CDMA
    }
    
    if (state.enableRadio.UMTS) {
        total += UMTS
    }
    
    if (state.enableRadio.LTE) {
        total += LTE
    }
    
    if (state.enableRadio.GSM) {
        metrics.GSM = (gsm / total)
    }
    if (state.enableRadio.CDMA) {
        metrics.CDMA = (CDMA / total)
    }
    if (state.enableRadio.UMTS) {
        metrics.UMTS = (UMTS / total)
    }
    if (state.enableRadio.LTE) {
        metrics.LTE = (LTE / total)
    }

    state.radioPer = {...metrics}
    state.totalStats = {gsm, CDMA, UMTS, LTE}
    console.log(state.radioPer, yearPer, "herro")
    state.yearPer = yearPer
    return state
}


export const TowerReducerSlice = createSlice({
    name: 'towerReducer',
    initialState: fetchMetrics({
        selectedFloor: false,
        enableRadio: {
            GSM: true,
            CDMA: true,
            UMTS: true,
            LTE: true
        },
        towerRange: 10,
        radioPer: { ...radioPer }
        // value
    }),
    reducers: {
        increment: state => {
            state.value += 1;
        },
        decrement: state => {
            state.selectedFloor -= 1;
        },
        setFloor: (state, payload) => {
            state.selectedFloor = payload.payload
            fetchMetrics(state)
        },
        updateRadio: (state, payload) => {
            state.enableRadio = {...state.enableRadio, ...payload.payload}
            fetchMetrics(state)
        },
        updateTowerRange: (state, payload) => {
            state.towerRange = payload.payload
            fetchMetrics(state)
        }
    },
});

export const { increment, decrement, setFloor, updateRadio, updateTowerRange } = TowerReducerSlice.actions;
export default TowerReducerSlice.reducer;
