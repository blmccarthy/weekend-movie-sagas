import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

// MATERIAL UI
import { Button, Grid, Paper, Typography, Card, CardMedia } from '@mui/material';

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
            <Paper elevation={3} sx={{ width: "90%", mx: "auto", my: 6 }}>
                <Grid container spacing={0}>
                    <Grid item lg={5} md={5} sm={5} xs={12}>
                        <Card sx={{ m: 4 }}>
                            <CardMedia 
                                component="img"
                                alt={selectedMovie.title}
                                image={selectedMovie.poster}
                            />
                        </Card>
                        {/* <img src={selectedMovie.poster} /> */}
                    </Grid>
                    <Grid item lg={7} md={7} sm={7} xs={12} sx={{ m: "auto", px: "5%" }}>
                        <Typography variant="h3">{selectedMovie.title}</Typography>
                        <Typography variant="h6">Genres</Typography>
                        {selectedGenre.map((movie) => {
                            return (<Typography variant="subtitle1" key={movie.genre_id}>{movie.genre}</Typography>)
                        })}
                        <Typography variant="h6">Movie Description</Typography>
                        <Typography variant="body2" textAlign="center">{selectedMovie.description}</Typography>
                        <br />
                        <Button variant="contained" onClick={handleEdit} sx={{ m: 1 }}>Edit</Button>
                        <Button variant="outlined" onClick={handleBack} sx={{ m: 1 }}>Back</Button>
                    </Grid>
                </Grid>
            </Paper>
        </>
    )
}