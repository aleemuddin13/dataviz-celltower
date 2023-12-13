import { useMemo, useState } from "react";
import * as d3 from "d3";
import { animated, SpringValue, useSpring } from "react-spring";
import Tooltip from "./Tooltip";

// type DataItem = {
//     name: string;
//     value?: number;
// };

// type DonutChartProps = {
//     width: number;
//     height: number;
//     data: DataItem[];
// };

const MARGIN = 30;

// const colors = [
//     "#e0ac2b",
//     "#e85252",
//     "#6689c6",
//     "#9a6fb0",
//     "#a53253",
//     "#69b3a2",
// ];

export const DonutChart = ({ width, height, data, colors, centerText, centerTextColor }) => {

    const [interactionData, setInteractionData] = useState();

    // Sort by alphabetical to maximise consistency between dataset
    const sortedData = data.sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));

    const radius = Math.min(width, height) / 2 - MARGIN;

    const pie = useMemo(() => {
        const pieGenerator = d3
            .pie()
                .value((d) => d.value || 0)
                .sort(null); // Do not apply any sorting, respect the order of the provided dataset
        return pieGenerator(sortedData);
    }, [data]);

    const allPaths = pie.map((slice, i) => {
        return (
            <g key={slice.data.name} onMouseEnter={(e) => {
                setInteractionData({
                    x: e.pageX,
                    y: e.pageY,
                    text: slice.data.text
                })
                }}

                onMouseLeave={() => {
                    setInteractionData(false)
                }}
            >
            <Slice
                key={slice.data.name}
                radius={radius}
                slice={slice}
                color={colors[i]}
                
            />
            </g>
        );
    });

    return (
        <div>
        <svg width={width} height={height} style={{ display: "inline-block" }}>
            <g transform={`translate(${width / 2}, ${height / 2})`}>{allPaths}</g>
                <text x={width/2} y={height/2} fill="white" text-anchor="middle" color={centerTextColor}>{centerText}</text>
        </svg>
        <Tooltip interactionData={interactionData}/>
        </div>
    );
};

// type SliceProps = {
//     color: string;
//     radius: number;
//     slice: d3.PieArcDatum<DataItem>;
// };
const Slice = ({ slice, radius, color }) => {
    const arcPathGenerator = d3.arc();

    const springProps = useSpring({
        to: {
            pos: [slice.startAngle, slice.endAngle],
        },
    });

    return (
        <animated.path
            d={springProps.pos.to((start, end) => {
                return arcPathGenerator({
                    innerRadius: 40,
                    outerRadius: radius,
                    startAngle: start,
                    endAngle: end,
                });
            })}
            fill={color}
        />
    );
};
