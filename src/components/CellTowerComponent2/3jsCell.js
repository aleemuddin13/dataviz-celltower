import React, { useEffect } from 'react';
import * as d3 from 'd3';

function Cylinder() {
    useEffect(() => {
        // Cylinder parameters
        const cylinderRadius = 50;
        const cylinderHeight = 200;

        // Create the SVG container
        const svg = d3.select("#cylinder-container");

        // Create top and bottom circles
        svg.append("circle")
            .attr("cx", 200)
            .attr("cy", 100)
            .attr("r", cylinderRadius)
            .attr("fill", "#3498db");

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
    }, []);

    return (
        <div>
            <svg width="400" height="400" id="cylinder-container"></svg>
        </div>
    );
}

export default Cylinder;
