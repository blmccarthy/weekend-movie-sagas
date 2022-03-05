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
    }, []);

    const handleImageClick = (event) => {
        // The event = movie.id of image that was clicked
        dispatch({ type: 'SET_SELECTED_MOVIE', payload: event})
        history.push(`/Details/${event}`)

        // TODO:
        // Current solution breaks '/Details' on refresh
        // Perhaps setup new axios.get that targets the '/${event}'
    }

    return (
        <main>
            <h1>MovieList</h1>
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