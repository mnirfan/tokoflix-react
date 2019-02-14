import { combineReducers } from 'redux'
import { PAY, SAVE_MOVIE, SHOW_BUY_MODAL, HIDE_BUY_MODAL } from '../actions/action-type'

const moneyReducer = (state = 0, action) => {
    switch (action.type) {
        case PAY:
            return state -= action.price
        default:
            return state
    }
}

const movieReducer = (state = [], action) => {
    switch (action.type) {
        case SAVE_MOVIE:
            return [...state, action.id ]
        default:
            return state
    }
}

const movieModalReducer = (state = {}, action) => {
    switch (action.type) {
        case SHOW_BUY_MODAL:
            return {...state, ...action.modalBuy }
        case HIDE_BUY_MODAL:
            return {...state, show: action.show}
        default:
            return state
    }
}

export default combineReducers({
    money: moneyReducer,
    movies: movieReducer,
    modalBuy: movieModalReducer
})