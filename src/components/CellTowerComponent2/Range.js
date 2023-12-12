import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';

import { sliderVertical } from 'd3-simple-slider';


const RangeIndicator = () => {
    const svgRef = useRef(null);
    const [radius, setRadius] = useState(50); // Initial radius in pixels
    const [range, setRange] = useState(5); // Initial range in kilometers
    const [isDragging, setIsDragging] = useState(false);

    useEffect(() => {
        const svg = d3.select(svgRef.current);
        const svgWidth = 400;
        const svgHeight = 400;

        // Create a circle to represent the range indicator
        const circle = svg
            .append('circle')
            .attr('cx', svgWidth / 2)
            .attr('cy', svgHeight / 2)
            .attr('r', radius)
            .attr('fill', 'blue')
            .attr('stroke', 'black')
            .attr('stroke-width', 2);

        // Create a drag behavior for the circle
        const drag = d3
            .drag()
            .on('start', () => {
                // On drag start, set the dragging flag
                setIsDragging(true);
            })
            .on('drag', (event) => {
                if (isDragging) {
                    // Calculate the new radius based on the drag distance
                    const dx = event.dx;
                    const dy = event.dy;
                    const newRadius = radius + Math.sqrt(dx * dx + dy * dy);

                    // Update the circle's radius and range text
                    circle.attr('r', newRadius);
                    updateRange(newRadius);
                }
            })
            .on('end', () => {
                // On drag end, reset the dragging flag
                setIsDragging(false);
            });

        // Apply the drag behavior to the circle
        circle.call(drag);

        // Create a text element to display the range
        svg
            .append('text')
            .attr('x', svgWidth / 2)
            .attr('y', svgHeight / 2 + radius + 20)
            .attr('text-anchor', 'middle')
            .text(`Range: ${range.toFixed(2)} km`);

        // Function to update the range based on the circle's radius
        function updateRange(newRadius) {
            // Calculate the range in kilometers based on the new radius
            const newRange = (newRadius / svgWidth) * 20; // Assuming 20 pixels represent 1 km

            // Update state variables for radius and range
            setRadius(newRadius);
            setRange(newRange.toFixed(2));
        }
        const slider = sliderVertical().min(0).max(100).width(300);
        const g = svg.append('g')
            .attr('transform', 'translate(60,30)');
        g.call(slider)

    }, [radius, range, isDragging]);



    return (
        <div>
            <svg
                ref={svgRef}
                width="400"
                height="400"
                onMouseUp={() => setIsDragging(false)} // Handle mouseup event outside the circle
            ></svg>
            <p>Range: {range} km</p>
        </div>
    );
};

export default RangeIndicator;
