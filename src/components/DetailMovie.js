import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import Loading from './Loading'
import env from '../env'
import store from '../store'
import helpers from '../helpers'
import { showBuyModal } from '../actions/action-creators'
import './styles/detail-movie.css'

class _DetailMovie extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            movieData: {},
            isLoading: true,
            castCount: 6
        }
    }

    componentDidMount() {
        let id = this.props.history.location.pathname.split('-')[0].split('/')[1]
        axios({
            baseURL: env.baseUrl,
            url: `/movie/${id}`,
            params: {
                api_key: env.token,
                append_to_response: 'credits,similar,recommendations'
            }
        }).then((response) => {
            this.setState({
                movieData: response.data,
                cast: response.data.credits.cast || [],
                recommendations: response.data.recommendations.results || [],
                similar: response.data.similar.results || [],
                isLoading: false,
                runtime: helpers.runtimeText(response.data.runtime)
            })
        })
    }

    handleToggleCastCount() {
        if(this.state.castCount === 6) this.setState({castCount: this.state.cast.length})
        else this.setState({castCount: 6})
    }

    render() {
        if (this.state.isLoading) return <Loading/>
        else return (
            <div>
                <div className="header">
                    <div className="top-container flex-row">
                        <div className="poster">
                            <img src={`${env.imgBaseUrl}${this.state.movieData.poster_path}`}/>
                        </div>
                        <div className="info">
                            <div id="title">
                                <strong>{this.state.movieData.original_title}</strong>
                                <span> ({new Date(this.state.movieData.release_date).getFullYear()})</span>
                            </div>
                            <div className="actions">
                                <div className="rating">
                                    <i className="material-icons">star</i>
                                    <span>{this.state.movieData.vote_average}</span>
                                </div>
                                <div>
                                    <i className="material-icons">access_time</i>
                                    { this.state.runtime.hour >= 1 ? (
                                        <span>
                                            {this.state.runtime.hour} jam {this.state.runtime.minutes} menit
                                        </span>
                                    ) : (
                                        <span>
                                            {this.state.runtime.minutes} menit
                                        </span>
                                    ) }
                                </div>
                                { this.props.moviesCollection.indexOf(this.state.movieData.id) < 0 ? (
                                    <div className="action-buttons">
                                        <div
                                            className="button primary large"
                                            onClick={() => {store.dispatch(showBuyModal(this.state.movieData))}}>
                                            Beli Rp {helpers.moviePrice(this.state.movieData.vote_average).toLocaleString('id-ID')}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="bought">
                                        <i className="material-icons">check_circle</i>
                                        <span> Anda memiliki film ini</span>
                                    </div>
                                )}
                            </div>
                            <div className="overview">
                                <span>Ringkasan</span>
                                <p>{this.state.movieData.overview}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="top-container">
                    <div className="section-title">
                        <h2>Pemeran</h2>
                    </div>
                    <div className="cast-list">
                        { this.state.cast.slice(0, this.state.castCount).map(actor => (
                            <div className="cast-card"  key={actor.id}>
                                <div className="photo">
                                    { actor.profile_path ? (
                                        <img src={env.imgBaseUrl + actor.profile_path}/>    
                                    ) : (
                                        <i className="material-icons">person</i>    
                                    )}
                                </div>
                                <p className="name">{actor.name}</p>
                                <p className="character"> {actor.character} </p>
                            </div>
                        )) }
                    </div>
                    <div>
                        { this.state.cast.length > 6 && (
                            <div className="button" onClick={() => {this.handleToggleCastCount()}}>
                                {this.state.castCount === 6 ? 'Tampilkan selengkapnya' : 'Tampilkan lebih sedikit'}
                            </div>
                        )}
                    </div>
                    <div className="section-title">
                        <h2>Rekomendasi</h2>
                    </div>
                    <div className="recomm-list">
                        { this.state.recommendations.map(item => (
                            <div className="recomm-card" key={item.id}>
                                <div className="backdrop">
                                    { item.backdrop_path ? (
                                        <img src={env.imgBaseUrl + item.backdrop_path}/>
                                    ) : (
                                        <i className="material-icons">broken_image</i>
                                    )}
                                </div>
                                <div className="flex-row recomtext">
                                    <div className="recomm-title">
                                        {item.original_title}
                                    </div>
                                    <div className="verticenter">
                                        <i className="material-icons">star</i> <span>{item.vote_average}</span>
                                    </div>
                                </div>
                            </div>
                        )) }
                    </div>
                    <div className="section-title">
                        <h2>Serupa</h2>
                    </div>
                    <div className="recomm-list">
                        { this.state.similar.map(item => (
                            <div className="recomm-card" key={item.id}>
                                <div className="backdrop">
                                { item.backdrop_path ? (
                                    <img src={env.imgBaseUrl + item.backdrop_path}/>
                                ) : (
                                    <i className="material-icons">broken_image</i>
                                )}
                                </div>
                                <div className="flex-row recomtext">
                                    <div className="recomm-title">
                                    {item.original_title}
                                    </div>
                                    <div className="verticenter">
                                    <i className="material-icons">star</i> <span>{item.vote_average}</span>
                                    </div>
                                </div>
                            </div>
                        )) }
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        moviesCollection: state.movies
    }
}

const DetailMovie = connect(mapStateToProps)(_DetailMovie)

export default DetailMovie