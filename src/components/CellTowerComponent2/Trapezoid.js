import React, { useEffect } from 'react';
import * as d3 from 'd3';

const Trapezoid = () => {
    const { x, width, height } = { x: 10, width: 100, height: 100 }
    useEffect(() => {
        const svg = d3.select(`#sub-trapezoid-${x}`);

        const vertices = [
            { x: x, y: 0 },
            { x: x + width, y: 0 },
            { x: x + width - width / 3, y: height },
            { x: x + width / 3, y: height },
        ];

        const pathData = `M${vertices[0].x},${vertices[0].y}
                     L${vertices[1].x},${vertices[1].y}
                     L${vertices[2].x},${vertices[2].y}
                     L${vertices[3].x},${vertices[3].y}
                     Z`;

        svg.append('path')
            .attr('d', pathData)
            .attr('fill', 'blue');
    }, [x, width, height]);

    return (
        <svg width={400} height={400}>
            <svg className="sub-trapezoid" width={width} height={height} id={`sub-trapezoid-${x}`}></svg>
        </svg>
    );
};

export default Trapezoid;
