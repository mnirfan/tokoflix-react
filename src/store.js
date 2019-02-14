import { createStore } from 'redux'
import reducers from './reducers/reducers'

export default createStore(
    reducers,
    { 
        money: 10000,
        modalBuy: {
            show: false,
            id: null,
            title: '',
            price: 0
        }
    },
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)