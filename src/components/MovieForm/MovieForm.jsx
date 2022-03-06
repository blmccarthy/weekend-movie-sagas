import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

export default function MovieForm() {

    const history = useHistory();
    const dispatch = useDispatch();

    const genres = useSelector(store => store.genres)

    const [newMovieTitle, setNewMovieTitle] = useState('')
    const [newMoviePoster, setNewMoviePoster] = useState('')
    const [newMovieDescription, setNewMovieDescription] = useState('')
    const [newMovieGenre, setNewMovieGenre] = useState('')

    const handleSubmit = () => {
        console.log('in Submit');
        dispatch({
            type: 'ADD_MOVIE', payload: {
                title: newMovieTitle,
                poster: newMoviePoster,
                description: newMovieDescription
            }
        })
        // Returns to Home (Movie List)
        history.push('/');
    }

    const handleCancel = () => {
        history.push('/')
    }

    console.log('genres', genres);

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input
                    required
                    type="text"
                    placeholder="Movie title"
                    onChange={(e) => setNewMovieTitle(e.target.value)}
                />
                <input
                    required
                    type="text"
                    placeholder="Movie Poster URL"
                    onChange={(e) => setNewMoviePoster(e.target.value)}
                />
                <input
                    required
                    type="text"
                    placeholder="Movie Description"
                    onChange={(e) => setNewMovieDescription(e.target.value)}
                />
                <select
                    required
                    name="Movie Genre"
                    id="genre"
                    onChange={(e) => setNewMovieGenre(e.target.value)}
                >
                    <option value="" default hidden>Select a Genre...</option>
                    {genres.map((genre) => {
                        return (<option key={genre.id}>{genre.name}</option>)
                    })}
                </select>
                <input
                    type="submit" value="Save"
                />
            </form>
            <br />
            <button onClick={handleCancel}>Cancel</button>
        </>
    )
}