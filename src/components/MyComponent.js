// src/components/MyComponent.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from '../store/reducers/myFeature';

function MyComponent() {
    const count = useSelector((state) => state.myFeature.value);
    const dispatch = useDispatch();

    return (
        <div>
            <div>Count: {count}</div>
            <button onClick={() => dispatch(increment())}>Increment</button>
            <button onClick={() => dispatch(decrement())}>Decrement</button>
        </div>
    );
}

export default MyComponent;
