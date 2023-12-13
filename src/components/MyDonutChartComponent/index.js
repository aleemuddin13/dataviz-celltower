import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DonutChart } from '../DonutChart.js';


const MyDonutChartComponent = ({ width, height }) => {
    const main = useSelector((state) => state.mainReducer)
    const filter = main.filter
    const stats = main.stats

    const data = []
    const COLORS = []

    if (filter.radio.GSM) {
        data.push({ 
            name: "GSM",
            value: stats.radio.GSM
        })
        COLORS.push(main.color.GSM)
    }

    if (filter.radio.CDMA) {
        data.push({
            name: "CDMA",
            value: stats.radio.CDMA
        })
        COLORS.push(main.color.CDMA)
    }
    
    if (filter.radio.UMTS) {
        data.push({
            name: "UMTS",
            value: stats.radio.UMTS
        })
        COLORS.push(main.color.UMTS)
    }

    if (filter.radio.LTE) {
        data.push({
            name: "LTE",
            value: stats.radio.LTE
        })
        COLORS.push(main.color.LTE)
    }

    return <DonutChart width={width} height={height} data={data} colors={COLORS} />
}

export default MyDonutChartComponent