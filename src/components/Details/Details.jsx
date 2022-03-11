import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

// MATERIAL UI
import { Button, Grid, Paper, Typography, Card, CardMedia } from '@mui/material';

export default function Details() {

    const dispatch = useDispatch();
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

    // store page params
    const { id } = useParams();


    // Protects page from breaking upon reload
    useEffect(() => {
        dispatch({ type: 'FETCH_SELECTED_MOVIE', payload: id });
    }, []);


    return (
        <>
            <Paper elevation={3} sx={{ width: "90%", mx: "auto", my: 6 }}>
                <Grid container justifyContent="space-evenly">
                    <Grid item lg={5} md={5} sm={8} xs={12} sx={{m: "auto"}}>
                        <Card sx={{ m: 4 }}>
                            <CardMedia 
                                component="img"
                                alt={selectedMovie.title}
                                image={selectedMovie.poster}
                            />
                        </Card>
                    </Grid>
                    <Grid item lg={7} md={7} sm={12} xs={12} sx={{ m: "auto", p: "7.5%" }}>
                        <Typography variant="h3" sx={{ mb: 2 }}>{selectedMovie.title}</Typography>
                        <Typography variant="h6">Genres</Typography>
                        <Typography variant="subtitle1" sx={{ mb: 2 }}>{selectedGenre.map(movie => movie.genre).join(", ")}</Typography>
                        <Typography variant="h6">Movie Description</Typography>
                        <Typography variant="body2" textAlign="center" sx={{ mb: 2 }}>{selectedMovie.description}</Typography>
                        <br />
                        <Button variant="contained" onClick={handleEdit} sx={{ m: 1 }}>Edit</Button>
                        <Button variant="outlined" onClick={handleBack} sx={{ m: 1 }}>Back</Button>
                    </Grid>
                </Grid>
            </Paper>
        </>
    )
}