import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

export default function MovieForm() {

    const history = useHistory();
    const dispatch = useDispatch();

    const genres = useSelector(store => store.genres)
    const movies = useSelector(store => store.movies)
    const movieGenres = useSelector(store => store.movieGenres)
    
    // Imports Selected Movie Details
    const selectedMovie = useSelector(store => store.selectedMovieReducer)

    // Sets Selected Genre of Movie
    const selectedGenre = (movieGenres.filter(movie => movie.movie_id == selectedMovie.id)[0]).genre_id;

    // Genres for dropdown made available if page refreshes 
    useEffect(() => {
        dispatch({ type: 'FETCH_GENRES'})
    }, []) ;

    const [newMovieTitle, setNewMovieTitle] = useState(selectedMovie.title)
    const [newMoviePoster, setNewMoviePoster] = useState(selectedMovie.post)
    const [newMovieDescription, setNewMovieDescription] = useState(selectedMovie.description)
    const [newMovieGenre, setNewMovieGenre] = useState(selectedGenre)

    const handleUpdate = () => {
        dispatch({
            type: 'UPDATE_MOVIE', payload: {
                id: selectedMovie.id,
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
    console.log('selectedGenre', selectedGenre);

    return (
        <>
            <form onSubmit={handleUpdate}>
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
                <button type="submit">Update</button>
                <button onClick={handleCancel}>Cancel</button>
            </form>

        </>
    )
}