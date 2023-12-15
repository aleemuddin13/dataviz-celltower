import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Barplot } from "../BarPlot/index3"

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

    let data = []
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

        if (filter.radio.LTE) {
            data.push({
                group: countryData.cc,
                subgroup: "LTE",
                value: countryData.LTE
            })
        }
    }

    // for (let index = 0; index < 1; index++) {
    //     const countryData = sortedCountryDataList[index]
    //     groups.push(countryData.cc)
    //     if (filter.radio.GSM) {
    //         data.push({
    //             group: countryData.cc,
    //             subgroup: "GSM",
    //             value: 10
    //         })
    //     }

    //     if (filter.radio.CDMA) {
    //         data.push({
    //             group: countryData.cc,
    //             subgroup: "CDMA",
    //             value: 10
    //         })
    //     }

    //     if (filter.radio.UMTS) {
    //         data.push({
    //             group: countryData.cc,
    //             subgroup: "UMTS",
    //             value: 10
    //         })
    //     }

    //     if (filter.radio.LTE) {
    //         data.push({
    //             group: countryData.cc,
    //             subgroup: "LTE",
    //             value: 10
    //         })
    //     }
    // }


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

    // console.log(groups, subGroups, data)

    // data = [
    //     { group: "Mark", subgroup: "travel", value: 90 },
    //     { group: "Mark", subgroup: "food", value: 23 },
    //     { group: "Mark", subgroup: "beer", value: 14 },
    //     { group: "Robert", subgroup: "travel", value: 12 },
    //     { group: "Robert", subgroup: "food", value: 9 },
    //     { group: "Robert", subgroup: "beer", value: 2 },
    //     { group: "Emily", subgroup: "travel", value: 34 },
    //     { group: "Emily", subgroup: "food", value: 0 },
    //     { group: "Emily", subgroup: "beer", value: 4 },
    //     { group: "Marion", subgroup: "travel", value: 53 },
    //     { group: "Marion", subgroup: "food", value: 14 },
    //     { group: "Marion", subgroup: "beer", value: 102 },
    //     { group: "Nicolas", subgroup: "travel", value: 98 },
    //     { group: "Nicolas", subgroup: "food", value: 9 },
    //     { group: "Nicolas", subgroup: "beer", value: 8 },
    //     { group: "Mélanie", subgroup: "travel", value: 23 },
    //     { group: "Mélanie", subgroup: "food", value: 23 },
    //     { group: "Mélanie", subgroup: "beer", value: 3 },
    //     { group: "Gabriel", subgroup: "travel", value: 18 },
    //     { group: "Gabriel", subgroup: "food", value: 11 },
    //     { group: "Gabriel", subgroup: "beer", value: 18 },
    //     { group: "Jean", subgroup: "travel", value: 104 },
    //     { group: "Jean", subgroup: "food", value: 10 },
    //     { group: "Jean", subgroup: "beer", value: 14 },
    //     { group: "Paul", subgroup: "travel", value: 2 },
    //     { group: "Paul", subgroup: "food", value: 12 },
    //     { group: "Paul", subgroup: "beer", value: 92 },
    // ]

    return <Barplot width={width} height={height} data={data} groups={groups} subGroups={subGroups} COLORS={COLORS}/>
}

export default MyBarPlotComponent