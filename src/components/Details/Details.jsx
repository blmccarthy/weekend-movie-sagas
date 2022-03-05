import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Details() {

    const history = useHistory();
    const movies = useSelector(store => store.movies);
    const selectedMovieReducer = useSelector(store => store.selectedMovieReducer);

    // Targets specific movie that was clicked
    // Pulls info from the 'movies' Reducer
    const selectedMovie = movies[selectedMovieReducer - 1];

    const handleBack = () => {
        history.push('/');
    }

    return (
        <>
            <div>
                <img src={selectedMovie.poster} />
                <h1>{selectedMovie.title}</h1>
                <div>{selectedMovie.description}</div>
                <br />
                <button onClick={handleBack}>Back</button>
            </div>
        </>
    )
}