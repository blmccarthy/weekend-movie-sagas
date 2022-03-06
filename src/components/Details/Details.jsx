import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Details() {

    const history = useHistory();
    const movies = useSelector(store => store.movies);
    const selectedMovieReducer = useSelector(store => store.selectedMovieReducer);

    // Targets specific movie that was clicked from Reducer
    const selectedMovie = movies.filter(movie => movie.id == selectedMovieReducer);

    const handleBack = () => {
        history.push('/');
    }

    console.log('movies', movies);
    console.log('selectedMovieReducer', selectedMovieReducer);
    console.log('selectedMovie', selectedMovie);

    return (
        <>
            <div>
                <img src={selectedMovie[0].poster} />
                <h1>{selectedMovie[0].title}</h1>
                <div>{selectedMovie[0].description}</div>
                <br />
                <button onClick={handleBack}>Back</button>
            </div>
        </>
    )
}