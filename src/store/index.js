import { configureStore } from '@reduxjs/toolkit';

import { globeReducer } from './reducers/CellGlobeReducer';
import TowerReducer from './reducers/TowerReducer';
import MainReducer from './MainReducer';

export const store = configureStore({
    reducer: {
        globeReducer: globeReducer,
        towerReducer: TowerReducer,
        mainReducer: MainReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            immutableCheck: false,
        }),
});
