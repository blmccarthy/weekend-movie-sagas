import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './MovieList.css'


function MovieList() {

    const history = useHistory();
    const dispatch = useDispatch();

    const movies = useSelector(store => store.movies);

    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });
        dispatch({ type: 'FETCH_GENRES' });
        dispatch({ type: 'FETCH_MOVIE_GENRES' });
    }, []);

    const handleImageClick = (event) => {

        // The 'event' = movie.id of image that was clicked
        // The [0] makes it a simple object, rather than array of 1 object
        const selectedMovie = (movies.filter( movie => movie.id == event))[0]

        // Stores Selected Movie info
        dispatch({ type: 'SET_SELECTED_MOVIE', payload: selectedMovie})
        history.push(`/Details/${selectedMovie.id}`)

        // TODO: *Strech
        // Current solution breaks '/Details' on refresh
        // Perhaps setup new axios.get that targets the '/${event}'
    }

    const navMovieForm = () => {

        // Clears Selected Movie Reducer so form doesn't preload with information
        dispatch({ type: 'SET_SELECTED_MOVIE', payload: {
            title: '',
            poster: '',
            description: '',
            genre: ''
        } });
        history.push('/form')
    }

    return (
        <main>
            <button onClick={navMovieForm}>ADD MOVIE</button>
            <section className="movies">
                {movies.map(movie => {
                    return (
                        <div key={movie.id} >
                            <h3>{movie.title}</h3>
                            <img 
                                // function below: e.target.id = {movie.id}
                                onClick={(e) => handleImageClick(e.target.id)} 
                                src={movie.poster} 
                                alt={movie.title}
                                id={movie.id} // event target ^^^
                            />
                        </div>
                    );
                })}
            </section>
        </main>

    );
}

export default MovieList;