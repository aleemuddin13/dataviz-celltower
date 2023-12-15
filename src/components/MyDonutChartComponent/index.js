import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DonutChart } from '../DonutChart.js';
import helper from '../../lib/helper.js'
const formatLargeNumber = helper.formatLargeNumber


const MyDonutChartComponent = ({ width, height }) => {
    const main = useSelector((state) => state.mainReducer)
    const filter = main.filter
    const stats = main.stats
    const radioPer = main.stats.radioPer

    const data = []
    const COLORS = []

    let str = ''

    if (filter.radio.GSM) {
        data.push({ 
            name: "GSM",
            value: stats.radio.GSM,
            text: 'GSM('+(radioPer.GSM*100).toFixed(0)+'%) - '+formatLargeNumber(stats.radio.GSM)
        })
        COLORS.push(main.color.GSM)
        
    }

    if (filter.radio.CDMA) {
        data.push({
            name: "CDMA",
            value: stats.radio.CDMA,
            text: 'CDMA(' + (radioPer.CDMA * 100).toFixed(0) + '%) - ' + formatLargeNumber(stats.radio.CDMA)
        })
        COLORS.push(main.color.CDMA)
    }
    
    if (filter.radio.UMTS) {
        data.push({
            name: "UMTS",
            value: stats.radio.UMTS,
            text: 'UMTS(' + (radioPer.UMTS * 100).toFixed(0) + '%) - ' + formatLargeNumber(stats.radio.UMTS)
        })
        COLORS.push(main.color.UMTS)
    }

    if (filter.radio.LTE) {
        data.push({
            name: "LTE",
            value: stats.radio.LTE,
            text: 'LTE(' + (radioPer.LTE * 100).toFixed(0) + '%) - ' + formatLargeNumber(stats.radio.LTE)
        })
        COLORS.push(main.color.LTE)
    }

    return <div>
        <h6 style={{ padding: 10, margin: 0, marginLeft: 30, height: 10, maxWidth: width-20 }}>Radio percentages:</h6>
        <DonutChart width={width-20} height={height-20} data={data} colors={COLORS} centerText={formatLargeNumber(main.stats.totalCells)} centerTextColor={main.color.PRIMARY} />
    </div>
}

export default MyDonutChartComponent