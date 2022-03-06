import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Details() {

    const history = useHistory();

    // Reducer Imports
    const movieGenres = useSelector(store => store.movieGenres);
    const selectedMovie = useSelector(store => store.selectedMovieReducer);
    // Grabs all genres related to selectedMovie
    const selectedGenre = movieGenres.filter(movie => movie.movie_id == selectedMovie.id)

    const handleBack = () => {
        history.push('/');
    }

    const handleEdit = () => {
        history.push('/edit');
    }

    return (
        <>
            <div>
                <img src={selectedMovie.poster} />
                <h1>{selectedMovie.title}</h1>
                <div><b>GENRES</b></div>
                <ul>
                    {selectedGenre.map((movie) => {
                        return (<li key={movie.genre_id}>{movie.genre}</li>)
                    })}
                </ul>
                <div><b>MOVIE DESCRIPTION:</b></div>
                <div>{selectedMovie.description}</div>
                <br />
                <button onClick={handleBack}>Back</button>
                <button onClick={handleEdit}>Edit</button>
            </div>
        </>
    )
}