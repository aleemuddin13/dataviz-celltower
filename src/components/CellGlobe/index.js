import React, { useRef, useEffect, useMemo } from 'react';
import * as d3 from "d3";
import Globe from 'react-globe.gl';
import { useSelector, useDispatch } from 'react-redux';
import helper from '../../lib/helper'

import { scaleSequential } from 'd3-scale';
import { interpolateGreys, interpolateOranges, interpolateCividis } from 'd3-scale-chromatic';

const formatLargeNumber = helper.formatLargeNumber

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

// Define the sequential color scale
const colorScale = scaleSequential(interpolateGreys).domain([1,0]);


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


const CellGlobe = ({ width, height }) => {
    const globeEl = useRef();
    const dispatch = useDispatch();
    const { countries, altitude, transitionDuration, points } = useSelector((state) => state.globeReducer);
    const radioPer = useSelector((state) => state.towerReducer.radioPer)
    const yearPer = useSelector((state) => state.towerReducer.yearPer)

    const main = useSelector((state) => state.mainReducer)

    const xScale = useMemo(() => {
        return d3.scaleLinear().domain([0, main.stats.maxCount]).range([0, width]);
    }, [main.stats, width]);

    const grid = xScale
        .ticks(5)
        .slice(1)
        .map((value, i) => (
            <g key={i}>
                <line
                    x1={xScale(value)}
                    x2={xScale(value)}
                    y1={0}
                    y2={50}
                    stroke="white"
                    opacity={0.4}
                />
                <text
                    x={xScale(value)}
                    y={50 + 10}
                    textAnchor="middle"
                    alignmentBaseline="central"
                    fontSize={9}
                    opacity={0.8}
                    fill={"white"}
                >
                    {formatLargeNumber(value)}
                </text>
            </g>
        ));

    // useEffect(() => {
    //     // dispatch(fetchCountries());
    //     dispatch(fetchPoints())

    //     // setTimeout(() => {
    //     //     dispatch(setTransitionDuration(4000));
    //     //     dispatch(setAltitude(feat => Math.max(0.1, Math.sqrt(+feat.properties.POP_EST) * 7e-5)));
    //     // }, 3000);
    // }, [dispatch]);

    useEffect(() => {    
        // globeEl.current.controls().autoRotate = true;
        // globeEl.current.controls().autoRotateSpeed = 0.3;
        // globeEl.current.pointOfView({ altitude: 4 }, 5000);
    }, []);

    // const polygonsData = JSON.parse(JSON.stringify(countries.features.filter(d => d.properties.ISO_A2 !== 'AQ')))
    const allPoints = JSON
    const N = 300;

    let xp = points
    let nx = Math.round(100 + (((yearPer) * 2000) / 100))
    xp = getRandomElementsFromArray(points, nx)

    const markerSvg = `<svg width="1" height="1">
    <circle cx="0.5" cy="0.5" r="0.4" fill="red"></circle>
</svg>`

    const gData = xp.map((x) => ({
        lat: x.lat,
        lng: x.lon,
        size: 0.000001,
        color: [main.color.GSM, main.color.CDMA, main.color.UMTS, main.color.LTE][Math.round(Math.random() * 3)]
    }));

    let newGData = []
    const iLat = 39.0
    const iLon = -101.0
    for (let x = 0; x < 10; x++) {
        for (let y = 0; y < 10; y++) {
            newGData.push({
                lat: iLat+(x/100),
                lng: iLon+(y/100),
                color: "red"
            })
        }
    }

    return <div><Globe
        ref={globeEl}
        width={width}
        backgroundColor={"black"}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
        
        polygonsData={countries.features}
        polygonAltitude={0.01}
        polygonStrokeColor={"#36454F"}
        
        
        // polygonCapColor={() => 'rgba(0, 0, 0, 0)'} rgba(200, 0, 0, 0.6)
        // polygonSideColor={() => 'rgba(0, 0, 0, 0)'} rgba(0, 100, 0, 0.15)
        // polygonAltitude={0.1}
        polygonCapColor={({ properties: d}) => {
            const cData = main.data[main.filter.year][main.filter.range].cMap[d.ISO_A2]
            let total = 0
            if(main.filter.radio.GSM){
                total += cData.GSM
            }
            if (main.filter.radio.CDMA) {
                total += cData.CDMA
            }
            if (main.filter.radio.UMTS) {
                total += cData.UMTS
            }
            if (main.filter.radio.LTE) {
                total += cData.LTE
            }
            return colorScale(total/main.stats.maxCount)
        }}
        polygonSideColor={() => '#36454F'}
        polygonLabel={({ properties: d }) =>{ 
            let total = 0
            const cData = main.data[main.filter.year][main.filter.range].cMap[d.ISO_A2]
            const gsm = formatLargeNumber(cData.GSM)
            const CDMA = formatLargeNumber(cData.CDMA)
            const UMTS = formatLargeNumber(cData.UMTS)
            const LTE = formatLargeNumber(cData.LTE)

            total = formatLargeNumber(cData.GSM + cData.CDMA + cData.UMTS + cData.LTE)

            return `<div style="color: #FFA500;">
                    <b>${d.ADMIN} (${d.ISO_A2})</b> <br />
                    Cell Towers: <i>${total}</i> <br/>
                    <d style="color: #FF5733;">GSM(2G): <i>${gsm}</i></d> <br/>
                    <d style="color: #33FF57;">CDMA(2G): <i>${CDMA}</i></d> <br/>
                    <d style="color: #3377FF;">UMTS(3G): <i>${UMTS}</i></d> <br/>
                    <d style="color: #FF33DD;">LTE(4G/5G): <i>${LTE}</i></d> <br/>
                    </div>
             `}}

        // htmlElementsData={newGData}
        // htmlElement={d => {
        //     const el = document.createElement('div');
        //     el.innerHTML = markerSvg;
        //     // el.style.color = d.color;
        //     // el.style.width = `${d.size}px`;

        //     // el.style['pointer-events'] = 'auto';
        //     // el.style.cursor = 'pointer';
        //     // // el.onclick = () => console.info(d);
        //     return el;
        // }}

        pointsData={newGData}
        pointColor="color"
        pointsMerge={false}
        pointRadius={0.01}
        pointResolution={5}
        pointAltitude={0.01}

        // pointAltitude="size"
        // polygonsTransitionDuration={transitionDuration}
    />
        <div className='color-scale' style={{ width: width - 40, background: `linear-gradient(to right, ${colorScale(0)}, ${colorScale(0.5)}, ${colorScale(1)})`}}>
            <svg width={width-40} height={90}>
                <g>{grid}</g>
            </svg>
        </div>
    </div>;
};

export default CellGlobe;
