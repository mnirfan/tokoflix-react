import React from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import qs from 'query-string'
import env from '../env'
import Loading from './Loading'
import helpers from '../helpers'
import store from '../store'
import { showBuyModal } from '../actions/action-creators'
import './styles/home.css'

class _MovieItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    handleDetail() {
        this.props.history.push(`/${this.props.movie.id}-${helpers.slugify(this.props.movie.original_title)}`)
    }
    
    render() {
        return (
            <div className="movie-item">
                <div className="poster">
                    <img src={env.imgBaseUrl + this.props.movie.poster_path} alt=''/>
                </div>
                <div className="info">
                    <div className="text">
                        <h2>{this.props.movie.original_title}</h2>
                        <div className="rating">
                            <i className="material-icons">star</i>
                            {this.props.movie.vote_average}
                        </div>
                        <p>{helpers.truncateDesc(this.props.movie.overview)}</p>
                    </div>
                    <div className="action">
                        { store.getState().movies.indexOf(this.props.movie.id) >= 0 && (
                            <div className="bought">
                                <i className="material-icons">check_circle</i> <span>Anda telah memiliki film ini</span>
                            </div>
                        )}
                        <div className="action-buttons">
                            <div className="button" onClick={() => {this.handleDetail()}}>
                                Detail
                            </div>
                            { store.getState().movies.indexOf(this.props.movie.id) < 0 && (
                                <div className="button primary" onClick={() => {store.dispatch(showBuyModal(this.props.movie))}}>
                                    Beli Rp{helpers.moviePrice(this.props.movie.vote_average).toLocaleString('id-ID')}
                                </div>
                            ) }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const MovieItem = withRouter(_MovieItem)

class Movies extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            items: props.movieData.results,
            page: props.page
        }
    }
    static getDerivedStateFromProps(nextProps) {
        return { items: nextProps.movieData.results, page: nextProps.page }
    }
    render() {
        console.log('rendering');
        var Items = this.state.items.map(movie => {
            return <MovieItem movie={movie} key={movie.id}/>
        })
        return (
            <div className="top-container">
                <h1>Sedang Tayang</h1>
                <div className="movie-list">
                { Items }
                </div>
                <div className="horizcenter pagination-status">
                    halaman {this.state.page} / {this.props.movieData.total_pages} 
                </div>
                
            </div>
        )
    }
}

class Dashboard extends React.Component {
    constructor(props) {
        super(props)
        let query = qs.parse(this.props.location.search)
        let page = query.page ? query.page : 1
        this.state = {
            page,
            movieData: {},
            isLoading: true
        }
    }

    getMovies() {
        this.setState({ isLoading: true })
        axios({
            baseURL: env.baseUrl,
            url: '/movie/now_playing',
            params: {
                api_key: env.token,
                page: this.state.page
            } 
        }).then(response => {
            this.setState({ movieData: response.data, isLoading: false })
        })
    }

    componentDidMount() {
        this.getMovies()
        
    }

    handlePrev() {
        this.setState((state) => {
            return {page: parseInt(state.page, 10)-1}
        }, () => { 
            this.getMovies()
            this.props.history.push(`/?page=${this.state.page}`)
        })
    }

    handleNext() {
        this.setState((state) => {
            return { page: parseInt(state.page, 10)+1 }
        }, () => {
            this.getMovies()
            this.props.history.push(`/?page=${this.state.page}`)
        })
    }

    render() {
        if (this.state.isLoading) return <Loading/>
        else return (
            <div>
                <Movies movieData={this.state.movieData} page={this.state.page}/>
                <div className="horizcenter pagination">
                { parseInt(this.state.page, 10) !== 1 && (
                    <div className="button icon" onClick={() => (this.handlePrev())}>
                        <i className="material-icons">keyboard_arrow_left</i>
                        Sebelumnya
                    </div>
                ) }
                { this.state.page < this.state.movieData.total_pages && (
                    <div className="button icon" onClick={() => (this.handleNext())}>
                        Selanjutnya
                        <i className="material-icons">keyboard_arrow_right</i>
                    </div>
                ) }
                </div>
            </div>
        )
    }
}

export default Dashboard