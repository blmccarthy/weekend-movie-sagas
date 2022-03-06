import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

// MATERIAL UI
import { Button } from '@mui/material';

export default function MovieForm() {

    const history = useHistory();
    const dispatch = useDispatch();

    const genres = useSelector(store => store.genres)
    const movies = useSelector(store => store.movies)
    const movieGenres = useSelector(store => store.movieGenres)
    
    // Imports Selected Movie Details
    const selectedMovie = useSelector(store => store.selectedMovieReducer)

    // Genres for dropdown made available if page refreshes 
    useEffect(() => {
        dispatch({ type: 'FETCH_GENRES'})
    }, []) ;

    const [newMovieTitle, setNewMovieTitle] = useState('')
    const [newMoviePoster, setNewMoviePoster] = useState('')
    const [newMovieDescription, setNewMovieDescription] = useState('')
    const [newMovieGenre, setNewMovieGenre] = useState('')

    const handleSubmit = () => {
        dispatch({
            type: 'ADD_MOVIE', payload: {
                title: newMovieTitle,
                poster: newMoviePoster,
                description: newMovieDescription,
                genre_id: newMovieGenre,
            }
        })
        history.push('/');
    }

    const handleCancel = () => {
        history.push('/')
    }

    console.log('selectedMovie', selectedMovie);

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input
                    required
                    type="text"
                    placeholder="Movie title"
                    value={newMovieTitle}
                    onChange={(e) => setNewMovieTitle(e.target.value)}
                />
                <input
                    required
                    type="text"
                    placeholder="Movie Poster URL"
                    value={newMoviePoster}
                    onChange={(e) => setNewMoviePoster(e.target.value)}
                />
                <input
                    required
                    type="text"
                    placeholder="Movie Description"
                    value={newMovieDescription}
                    onChange={(e) => setNewMovieDescription(e.target.value)}
                />
                <select
                    required
                    name="Movie Genre"
                    id="genre"
                    value={newMovieGenre}
                    onChange={(e) => setNewMovieGenre(e.target.value)}
                >
                    <option value="" default hidden>Select a Genre...</option>
                    {genres.map((genre) => {
                        return (<option key={genre.id} value={genre.id}>{genre.name}</option>)
                    })}
                </select>
                <br/><br/>
                <Button variant="contained" type="submit" sx={{m: 1}}>Save</Button>
                <Button variant="outlined" onClick={handleCancel} sx={{m: 1}}>Cancel</Button>
            </form>
        </>
    )
}