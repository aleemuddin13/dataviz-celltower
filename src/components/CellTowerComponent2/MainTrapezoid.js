import React, { useState } from 'react';
import SubTrapezoid from './SubTrapezoid';

const TowerOfHanoi = ({ numberOfDisks }) => {
    const [pegs, setPegs] = useState([
        Array.from({ length: numberOfDisks }, (_, i) => i),
        [],
        [],
    ]);

    // Function to move a disk from one peg to another
    const moveDisk = (from, to) => {
        const newPegs = [...pegs];
        const disk = newPegs[from].pop();
        newPegs[to].push(disk);
        setPegs(newPegs);
    };

    // Calculate the width and height of each disk
    const diskWidth = 40;
    const diskHeight = 20;

    // Calculate the total width of the SVG based on the number of disks
    const svgWidth = 3 * diskWidth + 40;
    const svgHeight = numberOfDisks * diskHeight + 40;

    const pegX = svgWidth / 2 - diskWidth / 2;
    const pegY = 40;

    const pegsComponents = pegs.map((peg, index) => {
        const x = index * (svgWidth / 3) + pegX;
        const pegHeight = (peg.length + 1) * diskHeight;

        return peg.map((disk, i) => (
            <SubTrapezoid
                key={disk}
                x={x}
                width={diskWidth + i * 20}
                height={diskHeight}
            />
        ));
    });

    return (
        <svg width={svgWidth} height={svgHeight}>
            <rect x={pegX} y={pegY} width={diskWidth} height={svgHeight - 40} fill="brown" />
            {pegsComponents}
        </svg>
    );
};

export default TowerOfHanoi;
