import { createSlice } from '@reduxjs/toolkit';
import data from '../datasets/main3.json'

const ccList = Object.keys(data[2010][1].cMap)

const initialState = {
    color: {
        GSM: '#FF5733',
        CDMA: '#33FF57',
        UMTS: '#3377FF',
        LTE: '#FF33DD',
        PRIMARY: '#FFA500',
        SECONDARY: '#00FFFF'
    },
    filter: {
        year: 2023,
        range: 10,
        radio: {
            GSM: true,
            CDMA: true,
            UMTS: true,
            LTE: true
        }
    },
    ccList,
    rotateTo: "IN",
    data
}


const updateCurrentStats = (state) => {
    const stats = {
        radio: {
            GSM: 0,
            CDMA: 0,
            UMTS: 0,
            LTE: 0
        },
        maxCount: 1,
        minCount: 99999999
    }
    const mainData = state.data[state.filter.year][state.filter.range]
    const countryDataList = []
    const filterRadio = state.filter.radio

    for (const country of ccList) {
        const obj = mainData.cMap[country]
        stats.radio.GSM += obj.GSM
        stats.radio.CDMA += obj.CDMA
        stats.radio.UMTS += obj.UMTS
        stats.radio.LTE += obj.LTE
        countryDataList.push({...obj, cc: country})
        let total = 0
        if(filterRadio.GSM){
            total += obj.GSM
        }
        if (filterRadio.CDMA) {
            total += obj.CDMA
        }
        if (filterRadio.UMTS) {
            total += obj.UMTS
        }
        if (filterRadio.LTE) {
            total += obj.LTE
        }
        stats.minCount = Math.min(stats.minCount, total)
        stats.maxCount = Math.max(stats.maxCount, total)
    }

    const radioPer = {
        GSM: 0, CDMA: 0, UMTS: 0, LTE: 0
    }

    let totalCells = 0
    

    if (filterRadio.GSM) {
        totalCells += stats.radio.GSM
    }
    if (filterRadio.CDMA) {
        totalCells += stats.radio.CDMA
    }
    if (filterRadio.UMTS) {
        totalCells += stats.radio.UMTS
    }
    if (filterRadio.LTE) {
        totalCells += stats.radio.LTE
    }

    if (filterRadio.GSM) {
        radioPer.GSM = stats.radio.GSM / totalCells
    }
    if (filterRadio.CDMA) {
        radioPer.CDMA = stats.radio.CDMA / totalCells
    }
    if (filterRadio.UMTS) {
        radioPer.UMTS = stats.radio.UMTS / totalCells
    }
    if (filterRadio.LTE) {
        radioPer.LTE = stats.radio.LTE / totalCells
    }
    
    stats.totalCells = totalCells
    stats.radioPer = radioPer

    stats.countryDataList = countryDataList
    state.stats = stats
    return state
}


export const MainReducerSlice = createSlice({
    name: "mainReducer",
    initialState: updateCurrentStats(initialState),
    reducers:{
        updateFilterYear: (state, payload) => {
            state.filter.year = payload.payload
            updateCurrentStats(state)
        },
        updateFilterRadio: (state, payload) => {
            let radio = { ...state.filter.radio, ...payload.payload }
            if(!radio.GSM && !radio.CDMA && !radio.UMTS && !radio.LTE){
                radio = {
                    GSM: true,
                    CDMA: true,
                    UMTS: true,
                    LTE: true
                }
            }
            state.filter.radio = radio
            updateCurrentStats(state)
        },
        updateFilterRange: (state, payload) => {
            state.filter.range = payload.payload
            updateCurrentStats(state)
        },
        updateRotateTo: (state, payload)=> {
            state.rotateTo = payload.payload
        }
    }
})

export const { updateFilterRadio, updateFilterRange, updateFilterYear, updateRotateTo } = MainReducerSlice.actions
export default MainReducerSlice.reducer