import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './MovieList.css'

// MATERIAL UI
import {
    Card, Button, Typography, CardMedia, Container, Grid
} from '@mui/material';


function MovieList() {

    const history = useHistory();
    const dispatch = useDispatch();

    const movies = useSelector(store => store.movies);

    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });
        dispatch({ type: 'FETCH_GENRES' });
        dispatch({ type: 'FETCH_MOVIE_GENRES' });
    }, []);

    const handleImageClick = (event) => {

        // The 'event' = movie.id of image that was clicked
        const selectedMovie = (movies.filter(movie => movie.id == event.id));

        console.log('imageClick, selectedMovie', selectedMovie);

        // Stores Selected Movie info
        dispatch({ type: 'SET_SELECTED_MOVIE', payload: selectedMovie });
        history.push(`/Details/${selectedMovie[0].id}`);
    }

    return (
        <main>
            <Container className="movies" maxWidth="lg">
                <Grid container spacing={3}>
                    {movies.map((movie) => {
                        return (
                            <Grid item key={movie.id} xs={6} sm={4} md={3}>
                                <Card
                                    key={movie.id}
                                    sx={{
                                        height: 370
                                    }}
                                    onClick={(e) => handleImageClick(e.target)}
                                >
                                    <CardMedia
                                        component="img"
                                        height="370"
                                        image={movie.poster}
                                        alt={movie.title}
                                        id={movie.id}
                                    />
                                    {/* <Typography
                                        variant="h6"
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="center"
                                        sx={{ p: 1.5, height: 60 }}
                                    >
                                        {movie.title}
                                    </Typography> */}
                                </Card>
                            </Grid>
                        );
                    })}
                </Grid>
            </Container>
        </main>

    );
}

export default MovieList;