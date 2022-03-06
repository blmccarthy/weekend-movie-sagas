import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Details() {

    const history = useHistory();

    // Reducer Imports
    const movies = useSelector(store => store.movies);
    const movieGenres = useSelector(store => store.movieGenres);
    const selectedMovieReducer = useSelector(store => store.selectedMovieReducer);

    // Targets specific movie that was clicked from Reducer
    const selectedMovie = movies.filter(movie => movie.id == selectedMovieReducer);
    // Targets only genres from movie that was selected
    const selectedGenre = movieGenres.filter(movie => movie.movie_id == selectedMovieReducer)

    const handleBack = () => {
        history.push('/');
    }

    return (
        <>
            <div>
                <img src={selectedMovie[0].poster} />
                <h1>{selectedMovie[0].title}</h1>
                <div><b>GENRES</b></div>
                <ul>
                    {selectedGenre.map((movie) => {
                        return (<li>{movie.genre}</li>)
                    })}
                </ul>
                <div><b>MOVIE DESCRIPTION:</b></div>
                <div>{selectedMovie[0].description}</div>
                <br />
                <button onClick={handleBack}>Back</button>
            </div>
        </>
    )
}