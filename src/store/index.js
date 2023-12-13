// import { applyMiddleware, createStore } from 'redux'
// import thunk from 'redux-thunk'
// import reducers from './reducers'
// import logger from 'redux-logger'
// import { setupWebsocket } from './websocket'
// import { setupSocket } from './socket'
// import nconf from 'nconf'
// import { getBinanceTickers } from '../helper'

// const actions = nconf.get('actions')

// export async function setupStore() {
//     let middleware
//     if (process.env.NODE_ENV === 'development') {
//         middleware = applyMiddleware(thunk, logger)
//     } else {
//         middleware = applyMiddleware(thunk)
//     }

//     const store = createStore(reducers, middleware)

//     if (
//         window.location.pathname === '/' ||
//         window.location.pathname.indexOf('/orders') !== -1
//     ) {
//         const response = await setupWebsocket({
//             host: nconf.get('ws:host'),
//             port: nconf.get('ws:port'),
//             path: nconf.get('ws:path')
//         })

//         response.receive(data => {
//             store.dispatch({
//                 type: actions.TRADE_TICKER_RECIEVED,
//                 payload: { priceTickerList: data }
//             })
//         })

//         const priceTickerList = await getBinanceTickers()
//         store.dispatch({
//             type: actions.TRADE_TICKER_RECIEVED,
//             payload: { priceTickerList }
//         })
//     }
//     const socketEvents = nconf.get('socket:events')
//     const response = await setupSocket({ url: nconf.get('socket:url') })
//     response.receive(({ event, payload }) => {
//         switch (event) {
//             case socketEvents.CONDITIONS: {
//                 store.dispatch({ type: actions.CONDITIONS_FETCHED, payload })
//                 break
//             }
//             case socketEvents.HOT_PAIR_LIST: {
//                 store.dispatch({ type: actions.HOT_PAIR_FETCHED, payload })
//                 break
//             }
//             case socketEvents.PAIR_ORDER_DEPTH_LIST: {
//                 store.dispatch({ type: actions.ORDER_DEPTH_FETCHED, payload })
//                 break
//             }
//             case socketEvents.ORDERS: {
//                 store.dispatch({ type: actions.ORDER_LIST_FETCHED, payload })
//                 break
//             }
//             default: {
//             }
//         }
//     })

//     // const response = await setupWebsocket({
//     //     host: nconf.get('server:host'),
//     //     port: nconf.get('server:port'),
//     //     path: '',
//     //     https: false
//     // })
//     // response.receive((a, b, c) => {
//     //     console.log('sooooo', a, b, c)
//     // })
//     return store
// }

// src/store.js
import { configureStore } from '@reduxjs/toolkit';

import myFeatureReducer from './reducers/myFeature';
import { globeReducer } from './reducers/CellGlobeReducer';
import TowerReducer from './reducers/TowerReducer';
import MainReducer from './MainReducer';

export const store = configureStore({
    reducer: {
        // Your reducers go here
        myFeature: myFeatureReducer,
        globeReducer: globeReducer,
        towerReducer: TowerReducer,
        mainReducer: MainReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            immutableCheck: false,
        }),
});
