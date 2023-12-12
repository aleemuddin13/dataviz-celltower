import React, { useEffect } from 'react';
import * as d3 from 'd3';

const getSutroTowerData = (towerWidth, towerHeight) => {
    const strokeWidth = towerWidth / 20;

    const shoulderWidth = towerWidth / 1.7;
    const waistWidth = towerWidth / 2.5;
    const waistHeight = towerHeight / 2.5;
    const crossbeamHeight = towerHeight / 4.5;

    const leftShoulder = towerWidth / 2 - shoulderWidth / 2;
    const rightShoulder = towerWidth / 2 + shoulderWidth / 2;

    const leftWaist = towerWidth / 2 - waistWidth / 2;
    const rightWaist = towerWidth / 2 + waistWidth / 2;

    const center = towerWidth / 2;

    return {
        lines: [
            // left
            {
                x1: leftShoulder,
                x2: leftShoulder,
                y1: 0,
                y2: crossbeamHeight,
                strokeWidth: strokeWidth * 0.7
            },
            {
                x1: leftShoulder,
                x2: leftWaist,
                y1: crossbeamHeight,
                y2: waistHeight,
                strokeWidth
            },
            {
                x1: leftWaist,
                x2: 0,
                y1: waistHeight,
                y2: towerHeight,
                strokeWidth
            },
            // center
            {
                x1: center * 1.07,
                x2: center * 1.07,
                y1: 5,
                y2: crossbeamHeight,
                strokeWidth: strokeWidth * 0.7
            },
            {
                x1: center * 1.07,
                x2: center * 1.07,
                y1: crossbeamHeight,
                y2: towerHeight,
                strokeWidth
            },
            // right
            {
                x1: rightShoulder,
                x2: rightShoulder,
                y1: 0,
                y2: crossbeamHeight,
                strokeWidth: strokeWidth * 0.7
            },
            {
                x1: rightShoulder,
                x2: rightWaist,
                y1: crossbeamHeight,
                y2: waistHeight,
                strokeWidth
            },
            {
                x1: rightWaist,
                x2: towerWidth,
                y1: waistHeight,
                y2: towerHeight,
                strokeWidth
            },
            // horizontals
            {
                x1: towerWidth * 0.05,
                x2: towerWidth * 0.95,
                y1: crossbeamHeight,
                y2: crossbeamHeight,
                strokeWidth: strokeWidth * 1.5
            },
            {
                x1: leftShoulder + (leftWaist - leftShoulder) / 2,
                x2: rightShoulder - (rightShoulder - rightWaist) / 2,
                y1: crossbeamHeight + (waistHeight - crossbeamHeight) / 2,
                y2: crossbeamHeight + (waistHeight - crossbeamHeight) / 2,
                strokeWidth
            },
            {
                x1: leftWaist,
                x2: rightWaist,
                y1: waistHeight,
                y2: waistHeight,
                strokeWidth: strokeWidth * 1.5
            },
            {
                x1: leftWaist * (2 / 3),
                x2: rightWaist + (towerWidth - rightWaist) * (1 / 3),
                y1: waistHeight + (towerHeight - waistHeight) / 3,
                y2: waistHeight + (towerHeight - waistHeight) / 3,
                strokeWidth: strokeWidth * 1.5
            },
            {
                x1: leftWaist * (1 / 3),
                x2: rightWaist + (towerWidth - rightWaist) * (2 / 3),
                y1: waistHeight + ((towerHeight - waistHeight) * 2) / 3,
                y2: waistHeight + ((towerHeight - waistHeight) * 2) / 3,
                strokeWidth: strokeWidth * 1.5
            }
        ],
        circles: []
    };
}

function Cylinder() {
    useEffect(() => {
        // Cylinder parameters
        const cylinderRadius = 50;
        const cylinderHeight = 200;

        const towerHeight = 400
        const towerWidth = 100

        const vertices = [
            { x: 50, y: 20 },
            { x: 150, y: 20 },
            { x: 120, y: 120 },
            { x: 80, y: 120 },
        ];
        const pathData = `M${vertices[0].x},${vertices[0].y} L${vertices[1].x},${vertices[1].y} L${vertices[2].x},${vertices[2].y} L${vertices[3].x},${vertices[3].y} Z`;

        const towerGeoData = getSutroTowerData(towerWidth, towerHeight).lines

        // Create the SVG container
        const svg = d3.select("#cylinder-container");

        // Create top and bottom circles
        // svg.append("circle")
        //     .attr("cx", 200)
        //     .attr("cy", 100)
        //     .attr("r", cylinderRadius)
        //     .attr("fill", "#3328db");

        // svg.append("circle")
        //     .attr("cx", 200)
        //     .attr("cy", 300)
        //     .attr("r", cylinderRadius)
        //     .attr("fill", "#3498db");

        // Create rectangle to connect circles
        svg.append("rect")
            .attr("x", 150)
            .attr("y", 100)
            .attr("width", 100)
            .attr("height", cylinderHeight)
            .attr("fill", "#3498db");

        svg
            .selectAll("line")
            .data(towerGeoData)
            .join("line")
            .attr("stroke", "grey")
            .attr("stroke-width", (d) => d.strokeWidth)
            .attr("x1", (d) => d.x1)
            .attr("x2", (d) => d.x2)
            .attr("y1", (d) => d.y1)
            .attr("y2", (d) => d.y2);

        svg.append('path')
            .attr('d', pathData)
            .attr('fill', 'blue');
    }, []);

    return (
        <div>
            <svg width="400" height="400" id="cylinder-container"></svg>
        </div>
    );
}

export default Cylinder;
