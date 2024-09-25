import React, { useEffect } from 'react';
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
            title: 'matrix',
            filter: 'all',
        };
    }

    fetchOMDb() {
        fetch(
            `http://www.omdbapi.com/?apikey=f59c7858&s=${
                this.state.title
            }&page=${this.state.page}${
                this.state.filter !== 'all' ? `&type=${this.state.filter}` : ``
            }`
        )
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
        movieTitle !== ''
            ? this.setState(
                  {
                      title: movieTitle,
                      filter: movieFilter,
                      page: 1,
                      loading: true,
                  },
                  () => this.fetchOMDb()
              )
            : this.setState(
                  { filter: movieFilter, page: 1, loading: true },
                  () => this.fetchOMDb()
              );
    };

    componentDidMount() {
        this.fetchOMDb();
    }

    componentDidUpdate() {
        //this.fetchOMDb();
    }

    handleClickDown = () => {
        this.setState({ page: this.state.page - 1, loading: true }, () =>
            this.fetchOMDb()
        );
    };

    handleClickUp = () => {
        this.setState({ page: this.state.page + 1, loading: true }, () =>
            this.fetchOMDb()
        );
    };

    render() {
        const { movies, loading, page, total } = this.state;

        return (
            <div className='container main-container'>
                <Search
                    searchMovies={this.searchMovies}
                    total={total}
                    page={page}
                />
                {!loading ? <Movies movies={movies} /> : <Preloader />}
                <div className='row'>
                    <button
                        className='btn left'
                        onClick={() => this.handleClickDown()}
                        disabled={page < 2}
                    >
                        <i className='small material-icons'>chevron_left</i>
                    </button>
                    <button
                        className='btn right'
                        onClick={() => this.handleClickUp()}
                        disabled={page >= Math.round(total / 10)}
                    >
                        <i className='small material-icons'>chevron_right</i>
                    </button>
                    <span className='currentPage'>
                        Current page: {page} / {Math.round(total / 10)}
                    </span>
                </div>
            </div>
        );
    }
}

export { Main };
