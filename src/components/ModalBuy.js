import React from 'react'
import { connect } from 'react-redux'
import { hideBuyModal, saveMovie, takeMoney } from '../actions/action-creators'

import store from '../store'
import './styles/modal-buy.css'

function _ModalBuy(props) {
    if (props.modalBuy.show){
        if (props.modalBuy.price > store.getState().money) {
            return (
                <div className="modal">
                    <div className="modal-box">
                        <div className="header">
                            Saldo tidak cukup
                        </div>
                        <div className="content">
                            Maaf, saldo anda tidak mencukupi untuk membeli film <strong>{props.modalBuy.title}</strong> seharga <strong>Rp{props.modalBuy.price.toLocaleString('id-ID')}</strong>.
                        </div>
                        <div className="actions right">
                            <div className="button" onClick={props.onClose}>Batal</div>
                        </div>
                    </div>
                </div>
            )
        }
        else {
            return (
                <div className="modal">
                    <div className="modal-box">
                        <div className="header">
                            Konfirmasi
                        </div>
                        <div className="content">
                            Beli film <strong>{props.modalBuy.title}</strong> seharga <strong>Rp{props.modalBuy.price.toLocaleString('id-ID')}</strong>?
                        </div>
                        <div className="actions right">
                            <div className="button" onClick={props.onClose}>Batal</div>
                            <div className="button primary" onClick={(e) => (props.buyMovie(props.modalBuy))}>ya</div>
                        </div>
                    </div>
                </div>
            )
        }
        
    }
    else return null       
}

const mapStateToProps = state => {
    return {
        modalBuy: state.modalBuy
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onClose: () => {
            dispatch(hideBuyModal())
        },
        buyMovie: (movie) => {
            dispatch(saveMovie(movie.id))
            dispatch(takeMoney(movie.price))
            dispatch(hideBuyModal())
        }
    }
}

const ModalBuy = connect(mapStateToProps, mapDispatchToProps)(_ModalBuy)

export default ModalBuy