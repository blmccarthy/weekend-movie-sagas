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
    // TODO: Stretch: This Breaks the blank add movie form, but works for edit
    const selectedGenre = (movieGenres.filter(movie => movie.movie_id == selectedMovie.id)[0]).genre_id;

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
    console.log('selectedGenre', selectedGenre);

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input
                    required
                    type="text"
                    placeholder="Movie title"
                    value={selectedMovie.title}
                    onChange={(e) => setNewMovieTitle(e.target.value)}
                />
                <input
                    required
                    type="text"
                    placeholder="Movie Poster URL"
                    value={selectedMovie.poster}
                    onChange={(e) => setNewMoviePoster(e.target.value)}
                />
                <input
                    required
                    type="text"
                    placeholder="Movie Description"
                    value={selectedMovie.description}
                    onChange={(e) => setNewMovieDescription(e.target.value)}
                />
                <select
                    required
                    name="Movie Genre"
                    id="genre"
                    // TODO: import selected value to drop down
                    value={selectedGenre}
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