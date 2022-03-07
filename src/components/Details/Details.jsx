import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

// MATERIAL UI
import { Button } from '@mui/material';

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
        history.push(`/edit/${selectedMovie.id}`);
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
                <Button variant="contained" onClick={handleEdit} sx={{m: 1}}>Edit</Button>
                <Button variant="outlined" onClick={handleBack} sx={{m: 1}}>Back</Button>
            </div>
        </>
    )
}