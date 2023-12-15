import { useSpring, animated } from "@react-spring/web";
import { useDispatch } from 'react-redux';

import { updateRotateTo } from "../../store/MainReducer";

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
    const dispatch = useDispatch()
    const { name, value, height: barHeight, width: barWidth, x, y, fill } = props;

    const springProps = useSpring({
        // the 'from' properties will be used only to animate the initialization of the component
        // if you put nothing it will be initialized with the first prop that is provided
        from: {
            barWidth: 0,
            valueOpacity: 0,
        },
        to: {
            barWidth: barWidth,
            valueOpacity:1,
            y,
        },
        config: {
            friction: 100,
        },
    });

    return (
            <animated.rect
                onClick={() => {
                    dispatch(updateRotateTo(name))
                }}
                x={x}
                y={springProps.y}
                width={springProps.barWidth}
                height={barHeight}
                opacity={springProps.valueOpacity}
                fill={fill}
                // fillOpacity={0.3}
                // strokeWidth={1}
                rx={1}
            />
           
    );
};
