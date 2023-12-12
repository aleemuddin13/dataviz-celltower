import React, { useRef, useEffect } from 'react';
import Globe from 'react-globe.gl';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCountries, fetchPoints, setAltitude, setTransitionDuration } from '../../store/reducers/CellGlobeReducer';
import statsJSON from '../../datasets/stats.json'


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


const CellGlobe = ({ width, height }) => {
    const globeEl = useRef();
    const dispatch = useDispatch();
    const { countries, altitude, transitionDuration, points } = useSelector((state) => state.globeReducer);
    const radioPer = useSelector((state) => state.towerReducer.radioPer)
    const yearPer = useSelector((state) => state.towerReducer.yearPer)

    // useEffect(() => {
    //     // dispatch(fetchCountries());
    //     dispatch(fetchPoints())

    //     // setTimeout(() => {
    //     //     dispatch(setTransitionDuration(4000));
    //     //     dispatch(setAltitude(feat => Math.max(0.1, Math.sqrt(+feat.properties.POP_EST) * 7e-5)));
    //     // }, 3000);
    // }, [dispatch]);

    useEffect(() => {    
        globeEl.current.controls().autoRotate = true;
        globeEl.current.controls().autoRotateSpeed = 0.3;
        globeEl.current.pointOfView({ altitude: 4 }, 5000);
    }, []);

    // const polygonsData = JSON.parse(JSON.stringify(countries.features.filter(d => d.properties.ISO_A2 !== 'AQ')))
    const allPoints = JSON
    const N = 300;

    let xp = points
    let nx = Math.round(100 + (((yearPer) * 2000) / 100))
    xp = getRandomElementsFromArray(points, nx)

    const gData = xp.map((x) => ({
        lat: x.lat,
        lng: x.lon,
        size: 0.000001,
        color: ['red', 'white', 'blue', 'green'][Math.round(Math.random() * 3)]
    }));

    return <Globe
        ref={globeEl}
        width={width}
        backgroundColor={"black"}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
        
        polygonsData={countries.features}
        polygonAltitude={0.01}
        // polygonCapColor={() => 'rgba(0, 0, 0, 0)'}
        // polygonSideColor={() => 'rgba(0, 0, 0, 0)'}
        // polygonAltitude={0.1}
        polygonCapColor={() => 'rgba(200, 0, 0, 0.6)'}
        polygonSideColor={() => 'rgba(0, 100, 0, 0.15)'}
        polygonLabel={({ properties: d }) =>{ 
            
            const st = statsJSON[d.ADMIN]
            if(!st){
                return `<b>${d.ADMIN} (${d.ISO_A2})</b> <br /> Data Not Available.`
            }
            let total = 0
            const gsm = mapPercentageToRange(yearPer, 0, st.GSM, customScaleFactors1)
            const CDMA = mapPercentageToRange(yearPer, 0, st.CDMA, customScaleFactors2)
            const UMTS = mapPercentageToRange(yearPer, 0, st.UMTS, customScaleFactors3)
            const LTE = mapPercentageToRange(yearPer, 0, st.LTE, customScaleFactors4)

            total = gsm + CDMA + UMTS + LTE

            return `
      <b>${d.ADMIN} (${d.ISO_A2})</b> <br />
      Cell Towers: <i>${Math.round(total/1000)}K</i> <br/>
      GSM(2G): <i>${Math.round(gsm/1000)}K</i> <br/>
      CDMA(2G): <i>${Math.round(CDMA /1000)}K</i> <br/>
      UMTS(3G): <i>${Math.round(UMTS /1000)}K</i> <br/>
      LTE(4G/5G): <i>${Math.round(LTE/1000)}K</i> <br/>

    `}}
        pointsData={gData}
        pointColor="color"
        pointsMerge={false}
        pointRadius={0.1}
        pointResolution={2}
        pointAltitude={0.1}

        // pointAltitude="size"
        // polygonsTransitionDuration={transitionDuration}
    />;
};

export default CellGlobe;