import nconf from 'nconf'

const defaultState = {
    minBalanceListFetching: false,
    minBalanceListFetched: false,
    minBalanceList: [],
    info: {}
}

const actions = nconf.get('actions')

export default function basicReducer(state = defaultState, action) {
    switch (action.type) {
        case actions.MIN_BALANCE_LIST_FETCHING: {
            state = { ...state, minBalanceListFetching: true }
            break
        }
        case actions.MIN_BALANCE_LIST_FETCHED: {
            const rows = action.payload.map(row => ({
                ...row,
                ...row.outputInfo,
                ...row.binanceInfo
            }))
            state = {
                ...state,
                minBalanceListFetched: true,
                minBalanceListFetching: false,
                minBalanceList: rows
            }
            break
        }
        default:
            break
    }
    return state
}
