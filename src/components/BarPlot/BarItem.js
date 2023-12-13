import { useSpring, animated } from "@react-spring/web";

// type BarItemProps = {
//     name: string;
//     value: number;
//     barHeight: number;
//     barWidth: number;
//     x: number;
//     y: number;
// };

// type AnimatedProps = {
//     barWidth: number;
//     value: number;
//     valueOpacity: number;
//     y: number;
// };

export const BarItem = (props) => {
    const { name, value, barHeight, barWidth, x, y, fill } = props;

    const springProps = useSpring({
        // the 'from' properties will be used only to animate the initialization of the component
        // if you put nothing it will be initialized with the first prop that is provided
        from: {
            value: 0,
            barWidth: 0,
            valueOpacity: 0,
        },
        to: {
            value: value,
            barWidth: barWidth,
            valueOpacity: barWidth > 80 ? 1 : 0,
            y,
        },
        config: {
            friction: 100,
        },
    });

    return (
            <animated.rect
                x={x}
                y={springProps.y}
                width={springProps.barWidth}
                height={barHeight}
                opacity={springProps.valueOpacity}
                fill={fill}
                // fillOpacity={0.3}
                strokeWidth={1}
                rx={1}
            />
           
    );
};
