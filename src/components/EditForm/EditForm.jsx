import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

// MATERIAL UI
import { Button, TextField, Select, MenuItem, Paper, FormControl, Typography, InputLabel, Grid } from '@mui/material';

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
        dispatch({ type: 'FETCH_GENRES' })
    }, []);

    const [newMovieTitle, setNewMovieTitle] = useState(selectedMovie.title)
    const [newMoviePoster, setNewMoviePoster] = useState(selectedMovie.poster)
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
            <Paper elevation={3} sx={{ m: 10, p: 10 }}>
                <Typography variant="h4" sx={{ mb: 4 }}>
                    Update Movie Info
                </Typography>
                <Grid container spacing={3}>
                    <Grid item lg={6} md={6} sm={12}>
                        <TextField
                            required
                            type="text"
                            placeholder="Movie title"
                            value={newMovieTitle}
                            onChange={(e) => setNewMovieTitle(e.target.value)}
                            sx={{ width: "100%" }}
                        />
                    </Grid>
                    <Grid item lg={6} md={6} sm={12}>
                        <TextField
                            required
                            type="text"
                            placeholder="Movie Poster URL"
                            value={newMoviePoster}
                            onChange={(e) => setNewMoviePoster(e.target.value)}
                            sx={{ width: "100%" }}
                        />
                    </Grid>
                    <Grid item lg={6} md={6} sm={12}>
                        <TextField
                            required
                            type="text"
                            placeholder="Movie Description"
                            value={newMovieDescription}
                            onChange={(e) => setNewMovieDescription(e.target.value)}
                            sx={{ width: "100%" }}
                        />
                    </Grid>
                    <Grid item lg={6} md={6} sm={12}>
                        <FormControl sx={{ width: "100%" }}>
                            <InputLabel id="movie-genre">Movie Genre</InputLabel>
                            <Select
                                required
                                name="Movie Genre"
                                id="genre"
                                label="Movie Genre"
                                placeholder="Movie Genre"
                                value={newMovieGenre}
                                onChange={(e) => setNewMovieGenre(e.target.value)}
                            >
                                <MenuItem value="" default disabled>Select a Genre...</MenuItem>
                                {genres.map((genre) => {
                                    return (<MenuItem key={genre.id} value={genre.id}>{genre.name}</MenuItem>)
                                })}
                            </Select>
                        </FormControl>
                    </Grid>
                    <br />
                    <Grid item lg={6} md={6} sm={12}>
                        <Button variant="contained" onClick={handleUpdate} sx={{ width: "100%" }}>Update</Button>
                    </Grid>
                    <Grid item lg={6} md={6} sm={12}>
                        <Button variant="outlined" onClick={handleCancel} sx={{ width: "100%" }}>Cancel</Button>
                    </Grid>
                </Grid>
            </Paper>
        </>
    )
}