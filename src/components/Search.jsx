import React from 'react';

class Search extends React.Component {
    constructor() {
        super();
        this.state = {
            search: '',
            filter: 'all',
        };
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleKey = (e) => {
        if (e.key === 'Enter') {
            this.handleSearch();
        }
    };

    handleSearch = () => {
        this.props.searchMovies(this.state.search, this.state.filter);
    };

    handleClickUp = () => {
        //this.props.pageCountUp();
    };

    handleClickDown = () => {
        //this.props.pageCountDown();
    };

    render() {
        const { search, filter } = this.state;

        return (
            <div className='row'>
                <div className='input-field inline col s12'>
                    <input
                        placeholder='Movies title'
                        type='search'
                        className='validate'
                        value={search}
                        onChange={(e) =>
                            this.setState({ search: e.target.value })
                        }
                        onKeyDown={this.handleKey}
                    />
                    <div className='row'>
                        <label className='filter'>
                            <input
                                className='with-gap'
                                name='filter'
                                type='radio'
                                value='all'
                                onChange={this.handleChange}
                                checked={filter === 'all'}
                            />
                            <span>All</span>
                        </label>
                        <label className='filter'>
                            <input
                                className='with-gap'
                                name='filter'
                                type='radio'
                                value='movie'
                                onChange={this.handleChange}
                                checked={filter === 'movie'}
                            />
                            <span>Movies</span>
                        </label>
                        <label className='filter'>
                            <input
                                className='with-gap'
                                name='filter'
                                type='radio'
                                value='series'
                                onChange={this.handleChange}
                                checked={filter === 'series'}
                            />
                            <span>Series</span>
                        </label>
                        <label className='filter'>
                            <input
                                className='with-gap'
                                name='filter'
                                type='radio'
                                value='episode'
                                onChange={this.handleChange}
                                checked={filter === 'episode'}
                            />
                            <span>Episode</span>
                        </label>
                        <label className='filter'>
                            <input
                                className='with-gap'
                                name='filter'
                                type='radio'
                                value='game'
                                onChange={this.handleChange}
                                checked={filter === 'game'}
                            />
                            <span>Game</span>
                        </label>
                    </div>
                    <button
                        className='btn search-btn'
                        onClick={this.handleSearch}
                    >
                        Search
                    </button>
                    <span className='totalPages'>
                        Total results: {this.props.total}
                    </span>
                </div>
            </div>
        );
    }
}
export { Search };
