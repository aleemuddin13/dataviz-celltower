import React, { useEffect } from 'react';
import * as d3 from 'd3';

const getSutroTowerData = (towerWidth, towerHeight, floors) => {
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

    const baseTower = {
        p1: { x: leftWaist, y: waistHeight },
        p2: { x: rightWaist, y: waistHeight },
        p3: { x: 0, y: towerHeight },
        p4: { x: towerWidth, y: towerHeight }
    }

    const childTrapezoidList = generateChildTrapezoidVertices(baseTower, floors)


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
            },
            {
                x1: -5,
                x2: towerWidth+5,
                y1: towerHeight,
                y2: towerHeight,
                strokeWidth: strokeWidth * 1.5
            }
        ],
        circles: [],
        baseTower,
        childTrapezoidList
    };
}


const getTrapezoidPathFormat = (vertices) => {
    return `M${vertices.p2.x},${vertices.p2.y}
                     L${vertices.p1.x},${vertices.p1.y}
                     L${vertices.p3.x},${vertices.p3.y}
                     L${vertices.p4.x},${vertices.p4.y}
                     Z`;
}

function divideDiagonalLine(startPoint, endPoint, n = 5) {
    // Calculate the coordinates of the points along the diagonal line
    const points = d3.range(n + 1).map((i) => {
        const t = i / n;
        const x = (1 - t) * startPoint.x + t * endPoint.x;
        const y = (1 - t) * startPoint.y + t * endPoint.y;
        return { x, y };
    });
    return points
}

const generateChildTrapezoidVertices = (mainTrapezoid, n = 5) => {

    const leftPoints = divideDiagonalLine(mainTrapezoid.p3, mainTrapezoid.p1, n)
    const rightPoints = divideDiagonalLine(mainTrapezoid.p4, mainTrapezoid.p2, n)
    const result = []
    for (let index = 0; index < n; index++) {
        result.push({
            p1: leftPoints[index + 1],
            p2: rightPoints[index + 1],
            p3: leftPoints[index],
            p4: rightPoints[index]
        })
    }
    return result
}


const generateTowerGeometry = (input = {}) => {

    const {towerHeight, towerWidth, floors = 5} = input

    const result =  getSutroTowerData(towerWidth, towerHeight)

    return result

}


const CellTowerComponent = () => {
    const { width, height } =  { width: 500, height: 500}

    

    useEffect(() => {

        const padding = {
            top: 20,
            right: 20,
            bottom: 20,
            left: 20
        };

        const towerHeight = height - 100
        const towerWidth = width - 300
        
        const svg = d3.select('#main-svg')

        const g = svg.append('g')
            .attr('transform', `translate(${padding.left}, ${padding.top})`);

        const towerGemetryData = getSutroTowerData(towerWidth, towerHeight, 5) 

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




        const {childTrapezoidList} = towerGemetryData
        for (const trapezoid of childTrapezoidList) {
            g.append('path')
                .attr('d', getTrapezoidPathFormat(trapezoid))
                // .attr('fill', 'blue');
        }

    }, [width, height])

    return (
        <svg width={width} height={height} id="main-svg">
            {/* <svg className="sub-trapezoid" width={width} height={height} id={`sub-trapezoid-${x}`}></svg> */}
        </svg>
    );
};

export default CellTowerComponent;
