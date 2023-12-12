import { combineReducers } from 'redux'
import tradeTableReducer from './tradeTableReducer'
import userOrderReducer from './userOrderReducer'
import blockPageReducer from './blockPageReducer'
import tickerReducer from './tickerReducer'
import orderDepthReducer from './orderDepthReducer'
import conditionsReducer from './conditionsReducer'
import hotPairReducer from './hotPairReducer'
import orderReducer from './orderReducer'
import archiveReducer from './archiveReducer'
import minBalanceReducer from './minBalanceReducer'
import hotLatestReducer from './hotLatestReducer'

export default combineReducers({
    tradeTable: tradeTableReducer,
    userOrderReducer: userOrderReducer,
    blockPage: blockPageReducer,
    ticker: tickerReducer,
    orderDepth: orderDepthReducer,
    conditions: conditionsReducer,
    hotPair: hotPairReducer,
    order: orderReducer,
    archive: archiveReducer,
    minBalance: minBalanceReducer,
    hotLatest: hotLatestReducer
})
