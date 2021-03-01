import { HOME, INTRODUCTION, ESTIMATION, STATISTICS } from '../action/ActionType'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const initialstate = { curpage: "home" }

const persistConfig = {
    key: 'root',
    storage
}

const CurrentPageReducer = (state = initialstate, action) => {
    switch (action.type) {
        case HOME:
            return { ...state, curpage: "home" };
        case INTRODUCTION:
            return { ...state, curpage: "introduction" };
        case ESTIMATION:
            return { ...state, curpage: "estimation" };
        case STATISTICS:
            return { ...state, curpage: "statistics" };
        default:
            return state;
    }
}

export default persistReducer(persistConfig, CurrentPageReducer);