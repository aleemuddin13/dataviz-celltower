import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Barplot } from "../BarPlot"

const MyBarPlotComponent = ({width, height}) => {
    const main = useSelector((state) => state.mainReducer)
    const filter = main.filter

    const stats = main.stats

    const countryDataList = [...stats.countryDataList]

    const sortedCountryDataList = countryDataList.sort((a, b) => {
        let aTotal = 0
        let bTotal = 0
        if(filter.radio.GSM){
            aTotal += a.GSM
            bTotal += b.GSM
        }
        if (filter.radio.CDMA) {
            aTotal += a.CDMA
            bTotal += b.CDMA
        }
        if (filter.radio.UMTS) {
            aTotal += a.UMTS
            bTotal += b.UMTS
        }
        if (filter.radio.LTE) {
            aTotal += a.LTE
            bTotal += b.LTE
        }

        return bTotal - aTotal
    })

    const data = []
    const groups = []
    const subGroups = []
    const COLORS = []

    for (let index = 0; index < 10; index++) {
        const countryData = sortedCountryDataList[index]
        groups.push(countryData.cc)
        if(filter.radio.GSM){
            data.push({
                group: countryData.cc,
                subgroup: "GSM",
                value: countryData.GSM
            })
        }

        if (filter.radio.CDMA) {
            data.push({
                group: countryData.cc,
                subgroup: "CDMA",
                value: countryData.CDMA
            })
        }

        if (filter.radio.UMTS) {
            data.push({
                group: countryData.cc,
                subgroup: "UMTS",
                value: countryData.UMTS
            })
        }
    }

    if(filter.radio.GSM){
        subGroups.push("GSM")
        COLORS.push(main.color.GSM)
    }

    if (filter.radio.CDMA) {
        subGroups.push("CDMA")
        COLORS.push(main.color.CDMA)
    }

    if (filter.radio.UMTS) {
        subGroups.push("UMTS")
        COLORS.push(main.color.UMTS)
    }

    if (filter.radio.LTE) {
        subGroups.push("LTE")
        COLORS.push(main.color.LTE)
    }

    return <Barplot width={width} height={height} data={data} groups={groups} subGroups={subGroups} COLORS={COLORS}/>
}

export default MyBarPlotComponent