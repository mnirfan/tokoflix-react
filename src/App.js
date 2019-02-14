import React, { Component } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import RouterView from './router'
import './components/styles/reset.css'
import './components/styles/movie.css'
import ModalBuy from './components/ModalBuy'
import { connect } from 'react-redux';

class _App extends Component {
    handleHomeButton() {
        this.props.history.push('/')
    }
    render() {
        return (
            <div id="app">
                <div id="nav">
                    <a href="/"><div className="logo">TokoFlix</div></a>
                    <div className="menu">
                    <div>
                        Saldo <span style={{color:" #4FA149", fontWeight: "bold"}}>Rp{this.props.money.toLocaleString('id-ID')}</span>
                    </div>
                    </div>
                </div>
                <Router>
                    <RouterView />
                </Router>
                <div id="footer">
                    &copy; 2019 TokoFlix
                </div>
                <ModalBuy/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        money: state.money
    }
}

const App = connect(mapStateToProps)(_App)

export default App;
