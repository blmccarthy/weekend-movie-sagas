import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './MovieList.css'

// MATERIAL UI
import {
    Box, Card, CardActions, CardContent, Button, Typography, CardMedia
} from '@mui/material';

import {
    AddBoxIcon
} from '@mui/icons-material';


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
        // The [0] makes it a simple object, rather than array of 1 object
        const selectedMovie = (movies.filter(movie => movie.id == event.id))[0];        

        // Stores Selected Movie info
        dispatch({ type: 'SET_SELECTED_MOVIE', payload: selectedMovie });
        history.push(`/Details/${selectedMovie.id}`);

        // TODO: *Strech
        // Current solution breaks '/Details' on refresh
        // Perhaps setup new axios.get that targets the '/${event}'
    }

    const navMovieForm = () => {

        // Clears Selected Movie Reducer so form doesn't preload with information
        dispatch({
            type: 'SET_SELECTED_MOVIE', payload: {
                title: '',
                poster: '',
                description: '',
                genre: ''
            }
        });
        history.push('/form')
    }

    return (
        <main>
            <Button variant="contained" onClick={navMovieForm} sx={{width: 300}}>ADD MOVIE</Button>
            <section className="movies">
                {movies.map(movie => {
                    return (
                        <Card 
                            key={movie.id} 
                            sx={{ 
                                width: 225,
                                margin: 1,                                
                            }}
                            onClick={(e) => handleImageClick(e.target)}
                        >
                            {/* <h3>{movie.title}</h3> */}
                            <Typography 
                                variant="h6" 
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                sx={{p: 1.5, height: 60}}
                            >
                                {movie.title}
                            </Typography>
                            <CardMedia
                                component="img"
                                // height="300"
                                image={movie.poster}
                                alt={movie.title}
                                id={movie.id}
                            />
                        </Card>
                    );
                })}
            </section>
        </main>

    );
}

export default MovieList;