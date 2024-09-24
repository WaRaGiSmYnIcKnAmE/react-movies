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
        };
    }

    fetchOMDb() {
        fetch('https://www.omdbapi.com/?apikey=b443c37f&s=matrix')
            .then((response) => response.json())
            .then((data) =>
                this.setState({ movies: data.Search, loading: false })
            );
    }

    searchMovies = (movieTitle, movieFilter) => {
        this.setState({ loading: true });
        fetch(
            `https://www.omdbapi.com/?apikey=b443c37f&s=${movieTitle}${
                movieFilter !== 'all' ? `&type=${movieFilter}` : ``
            }`
        )
            .then((response) => response.json())
            .then((data) =>
                this.setState({ movies: data.Search, loading: false })
            );
    };

    componentDidMount() {
        this.fetchOMDb();
    }

    render() {
        const { movies, loading } = this.state;

        return (
            <div className='container main-container'>
                <Search searchMovies={this.searchMovies} />
                {!loading ? <Movies movies={movies} /> : <Preloader />}
            </div>
        );
    }
}

export { Main };
