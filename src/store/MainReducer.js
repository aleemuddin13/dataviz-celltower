import { createSlice } from '@reduxjs/toolkit';
import data from '../datasets/main.json'

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
    data
}


const updateCurrentStats = (state) => {
    const stats = {
        radio: {
            GSM: 0,
            CDMA: 0,
            UMTS: 0,
            LTE: 0
        }
    }
    const mainData = state.data[state.filter.year][state.filter.range]
    const countryDataList = []

    for (const country of ccList) {
        const obj = mainData.cMap[country]
        stats.radio.GSM += obj.GSM
        stats.radio.CDMA += obj.CDMA
        stats.radio.UMTS += obj.UMTS
        stats.radio.LTE += obj.LTE
        countryDataList.push({...obj, cc: country})
    }

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
        }
    }
})

export const { updateFilterRadio, updateFilterRange, updateFilterYear} = MainReducerSlice.actions
export default MainReducerSlice.reducer