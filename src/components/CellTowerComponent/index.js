import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { sliderVertical } from 'd3-simple-slider';
import { useSelector, useDispatch } from 'react-redux';
import helper from '../../lib/helper';

import { setFloor, updateRadio, updateTowerRange } from '../../store/reducers/TowerReducer';


let sliderDone = false


const CellTowerComponent = ({ width, height }) => {
    const svgRef = useRef();
    const dispatch = useDispatch();
    const selectedFloor  = useSelector((state) => state.towerReducer.selectedFloor)
    const enableRadio = useSelector((state) => state.towerReducer.enableRadio)
    const towerRange = useSelector((state) => state.towerReducer.towerRange)
    const radioPer = useSelector((state) => state.towerReducer.radioPer)


    const [initialized, setInitialized] = useState(false); 

    const { height: towerHeight, width: towerWidth } = helper.resizeWithAspectRatio(false, height * 0.9 - 30, 1 / 5)
    const towerGemetryData = helper.getSutroTowerData(towerWidth, towerHeight, 13) 

    const createFloors = (svg, data) => {
        svg.selectAll('.trapezoid').remove();
        svg.selectAll('.trapezoid-text').remove();

        
        svg.selectAll('.trapezoid')
            .data(data)
            .enter()
            .append('path')
            .attr('class', 'trapezoid')
            .attr('d', (d) => {
                // Define the path for a trapezoid based on data
                const pathData = helper.getTrapezoidPathFormat(d)
                return pathData;
            })
            .attr("stroke", "grey")
            .attr('fill', (d) => {
                if(!selectedFloor || selectedFloor < d.text){
                    return false
                }
                return 'blue'
            }) // Change fill color as needed
            .on('click', (event, d) => {
                // Handle click event for each trapezoid here
                if(d.text !== selectedFloor){
                    dispatch(setFloor(d.text))
                }else{
                    dispatch(setFloor(false))
                }

            });

        svg.selectAll('.trapezoid-text')
            .data(data)
            .enter()
            .append('text')
            .attr('class', 'trapezoid-text')
            .attr('x', (d) => d.tx) // Calculate the center x-coordinate
            .attr('y', (d) => d.ty) // Calculate the center y-coordinate
            .attr('dy', '1em') // Adjust vertical alignment
            .attr('fill', 'white')
            .attr('text-anchor', 'middle') // Center the text horizontally
            .text((d) => d.text);
    }

    const createAntenna = (svg, data) => {
        svg.selectAll('.antenna').remove();
        svg.selectAll('.antenna-fill').remove();
        svg.selectAll('.antenna-text').remove();

        const antennaToggle = (event, d) => {
            const updateObj = {}
            const key = d.radio
            updateObj[key] = !enableRadio[d.radio]
            dispatch(updateRadio(updateObj))
        }


        svg.selectAll('.antenna')
            .data(data)
            .enter()
            .append('rect')
            .attr('class', 'antenna')
            .attr('x', d => d.x)
            .attr('y', d => d.y)
            .attr('width', d => d.width) // Adjust to fill half
            .attr('height', d => d.height)
            .attr("stroke", (d) => {
                if(enableRadio[d.radio]){
                    return "yellow"
                }
                return "grey"
            })
            .attr('stroke-width', 2)
            .attr('fill', (d) => {
               
            }) // Change fill color as needed
            .on('click', antennaToggle);

        svg.selectAll('.antenna-fill')
            .data(data)
            .enter()
            .append('rect')
            .attr('class', 'antenna')
            .attr('x', d => d.x)
            .attr('y', d => {
                const per = radioPer[d.radio]
                return d.y + d.height * (1-per)

            })
            .attr('width', d => d.width) // Adjust to fill half
            .attr('height', d => {
                const per = radioPer[d.radio]
                return d.height * per
            })
            .attr("stroke", (d) => {
                if (enableRadio[d.radio]) {
                    return "yellow"
                }
                return "grey"
            })
            // .attr("stroke", "grey")
            .attr('fill', (d) => {
                return 'blue'
            })
            .on('click', antennaToggle);


        svg.selectAll('.antenna-text')
            .data(data)
            .enter()
            .append('text')
            .attr('y', d => d.x + d.width/2)
            .attr('x', d => (d.y - d.height/2))
            .attr('text-anchor', 'middle')
            .attr('alignment-baseline', 'middle')
            .attr('transform', 'rotate(-90)')
            .attr('font-size', "0.55em")
            .attr('fill', 'white') // Set the text color
            .text((d) => `${d.radio} - ${(radioPer[d.radio]*100).toFixed(1)}%`)
            .on('click', antennaToggle);// Change fill color as needed

    }


    useEffect(() => {
        const svg = d3.select('#cell-tower-component-svg')
        const g = svg.append('g')
            .attr('transform', `translate(${(width - towerWidth) / 2}, ${(height - towerHeight) / 2})`)
            .attr('id', 'tower-base-g');

        
        g
            .selectAll("line")
            .data(towerGemetryData.lines)
            .join("line")
            .attr("stroke", "grey")
            .attr("stroke-width", (d) => d.strokeWidth)
            .attr("x1", (d) => d.x1)
            .attr("x2", (d) => d.x2)
            .attr("y1", (d) => d.y1)
            .attr("y2", (d) => d.y2);


        const { childTrapezoidList } = towerGemetryData
        createFloors(g, childTrapezoidList)
        createAntenna(g, towerGemetryData.antennaList)

        // g.selectAll().remove();
        if(!sliderDone){
            sliderDone = true
            const slider = sliderVertical()
                .min(1)
                .max(10)
                .step(1)
                .default(10)
                .width(10)
                .height(towerGemetryData.centerVertical.y2 - towerGemetryData.centerVertical.y1 - 10)
                .on('onchange', (value) => {
                    console.log(value)
                    dispatch(updateTowerRange(value))
                });
            const sliderGeom = g.append('g').attr('class', 'tower-slider').attr('transform',
                `translate(${towerGemetryData.centerVertical.x1+10}, ${towerGemetryData.centerVertical.y1})`);
            sliderGeom.call(slider)
            setInitialized(true)
        }

    })

    // useEffect(() => {
    //     if(!initialized){
    //         return
    //     }
    //     const g = d3.select(svgRef.current).select('#tower-base-g')
    //     console.log(g)
    //     createFloors(g, towerGemetryData.childTrapezoidList)

    //  }, [initialized, selectedFloor])

    return (
        <svg width={width} height={height} id="cell-tower-component-svg" ref={svgRef}>
        </svg>
    );

};

export default CellTowerComponent;
