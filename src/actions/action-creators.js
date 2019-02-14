import { SAVE_MOVIE, PAY, SHOW_BUY_MODAL, HIDE_BUY_MODAL } from './action-type'
import helpers from '../helpers'

export const saveMovie = (id) => ({
    type: SAVE_MOVIE,
    id: id
})

export const takeMoney = (price) => ({
    type: PAY,
    price: price
})

export const showBuyModal = (movie) => {
    let price = helpers.moviePrice(movie.vote_average)
    return {
        type: SHOW_BUY_MODAL,
        modalBuy: {
            show: true,
            id: movie.id,
            title: movie.title,
            price: price
        }
    }
}

export const hideBuyModal = (show) => ({
    type: HIDE_BUY_MODAL,
    show: show
})
