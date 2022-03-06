import { useDispatch } from 'react-redux';
import { useState } from 'react';

export default function MovieForm() {

    const dispatch = useDispatch();

    const [newMovieTitle, setNewMovieTitle] = useState('')
    const [newMoviePoster, setNewMoviePoster] = useState('')
    const [newMovieDescription, setNewMovieDescription] = useState('')

    const handleSubmit = () => {
        console.log('in Submit');
        dispatch({
            type: 'ADD_MOVIE', payload: {
                title: newMovieTitle,
                poster: newMoviePoster,
                description: newMovieDescription
            }
        })
        setNewMovieTitle('')
        setNewMoviePoster('')
        setNewMovieDescription('')
    }

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
                    id="genre">
                    <option value="" default disabled hidden>Select a Genre...</option>
                    <option value="1">Adventure</option>
                    <option value="2">Animated</option>
                    <option value="3">Biographical</option>
                    <option value="4">Comedy</option>
                    <option value="5">Disaster</option>
                    <option value="6">Drama</option>
                    <option value="7">Epic</option>
                    <option value="8">Fantasy</option>
                    <option value="9">Musical</option>
                    <option value="10">Romantic</option>
                    <option value="11">Science Fiction</option>
                    <option value="12">Space Opera</option>
                    <option value="13">Superhero</option>
                </select>
                <input
                    type="submit"
                />
            </form>
        </>
    )
}