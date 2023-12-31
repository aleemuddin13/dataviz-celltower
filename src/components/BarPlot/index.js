import { useMemo } from "react";
import * as d3 from "d3";

import { BarItem } from "./BarItem";
import helper from "../../lib/helper";

const formatLargeNumber = helper.formatLargeNumber

const MARGIN = { top: 0, right: 30, bottom: 30, left: 30 };
const BAR_PADDING = 0.2;


export const Barplot = ({ width, height, data, subGroups, groups, COLORS }) => {
    // bounds = area inside the graph axis = calculated by substracting the margins
    const boundsWidth = width - MARGIN.right - MARGIN.left;
    const boundsHeight = height - MARGIN.top - MARGIN.bottom;

    // Reformat the dataset
    const stackGenerator = d3
        .stack()
            .keys(subGroups)
            .value((d,t) => {
                let z = data.filter((item) => item.group === d && item.subgroup === t)[0].value
                return z
            });
    const series = stackGenerator(groups);

    // Find size of the longest bar and group rank.
    // Values are available in the last group of the stack
    const lastStackGroup = series[series.length - 1] || [];
    const groupTotalValues = lastStackGroup.map((group) => {
        const biggest = group[group.length - 1] || 0;
        return { name: group.data, value: biggest };
    });
    const sortedGroupTotalValues = groupTotalValues.sort(
        (a, b) => b.value - a.value
    );
    const maxValue = sortedGroupTotalValues[0].value;

    // Y axis is for groups since the barplot is horizontal
    const yScale = useMemo(() => {
        return d3
            .scaleBand()
            .domain(groupTotalValues.map((g) => g.name))
            .range([0, boundsHeight])
            .padding(BAR_PADDING);
    }, [data, height]);

    // X axis
    const xScale = useMemo(() => {
        return d3.scaleLinear().domain([0, maxValue]).range([0, boundsWidth]);
    }, [data, width]);

    // Color Scale
    var colorScale = d3.scaleOrdinal().domain(subGroups).range(COLORS);


    const rectangles = series.map((subgroup, i) => {
        return (
            <g key={i}>
                {subgroup.map((group, j) => {
                    return (
                        <BarItem
                            key={i+j}
                            y={yScale(group.data)}
                            height={yScale.bandwidth()}
                            x={xScale(group[0])}
                            width={xScale(group[1]) - xScale(group[0])}
                            fill={colorScale(subgroup.key)}
                            name={group.data}
                            opacity={0.6}
                        />
                    );
                })}
            </g>
        );
    });

    const labels = sortedGroupTotalValues.map((group, i) => {
        const y = yScale(group.name);

        if (!y) {
            return null;
        }

        return (
            <g key={i}>
                <text
                    x={xScale(group.value) - 7}
                    y={y + yScale.bandwidth() / 2}
                    textAnchor="end"
                    alignmentBaseline="central"
                    fontSize={12}
                    opacity={xScale(group.value) > 90 ? 1 : 0} // hide label if bar is not wide enough
                >
                    {formatLargeNumber(group.value)}
                </text>
                <text
                    x={xScale(0) + 7}
                    y={y + yScale.bandwidth() / 2}
                    textAnchor="start"
                    alignmentBaseline="central"
                    fontSize={12}
                >
                    {group.name}
                </text>
            </g>
        );
    });

    const grid = xScale
        .ticks(5)
        .slice(1)
        .map((value, i) => (
            <g key={i}>
                <line
                    x1={xScale(value)}
                    x2={xScale(value)}
                    y1={0}
                    y2={boundsHeight}
                    stroke="white"
                    opacity={0.4}
                />
                <text
                    x={xScale(value)}
                    y={boundsHeight + 10}
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

    return (
        <div>
            <svg width={width} height={height}>
                <g
                    width={boundsWidth}
                    height={boundsHeight}
                    transform={`translate(${[MARGIN.left, MARGIN.top].join(",")})`}
                >
                    <g>{grid}</g>
                    <g>{rectangles}</g>
                    <g>{labels}</g>
                </g>
            </svg>
        </div>
    );
};
