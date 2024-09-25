import React from 'react';
import { Movies } from './../components/Movies';
import { Search } from './../components/Search';
import { Preloader } from './../components/Preloader';

class Main extends React.Component {
    constructor() {
        super();

        this.state = {
            movies: [],
            loading: true,
            page: 1,
            total: 0,
        };
    }

    fetchOMDb() {
        fetch('https://www.omdbapi.com/?apikey=b443c37f&s=matrix&page=1')
            .then((response) => response.json())
            .then((data) =>
                this.setState({
                    movies: data.Search,
                    loading: false,
                    total: data.totalResults,
                })
            )
            .catch((error) => {
                console.error(error);
                this.setState({ loading: false });
            });
    }

    searchMovies = (movieTitle, movieFilter) => {
        this.setState({ loading: true });
        fetch(
            `https://www.omdbapi.com/?apikey=b443c37f&page=${
                this.state.page
            }&s=${movieTitle}${
                movieFilter !== 'all' ? `&type=${movieFilter}` : ``
            }`
        )
            .then((response) => response.json())
            .then((data) => {
                this.setState({
                    movies: data.Search,
                    loading: false,
                    total: data.totalResults,
                });
            })
            .catch((error) => {
                console.error(error);
                this.setState({ loading: false });
            });
    };

    pageCountUp = () => {
        this.setState({ page: this.state.page + 1 });
    };

    pageCountDown = () => {
        this.setState({ page: this.state.page - 1 });
    };

    componentDidMount() {
        this.fetchOMDb();
    }

    render() {
        const { movies, loading, page, total } = this.state;

        return (
            <div className='container main-container'>
                <Search searchMovies={this.searchMovies} total={total} />
                {!loading ? <Movies movies={movies} /> : <Preloader />}
                <div className='row'>Current page: {page}</div>
            </div>
        );
    }
}

export { Main };
