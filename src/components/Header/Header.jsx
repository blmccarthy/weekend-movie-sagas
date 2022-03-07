import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom'

import { Container, Typography, Button, Stack } from '@mui/material'


export default function Header() {

    const history = useHistory();
    const dispatch = useDispatch();

    const handleAddMovie = () => {

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
        <>
            <Container maxWidth="sm" sx={{ p: 10 }}>
                <Typography
                    component="h1"
                    variant="h2"
                    align="center"
                    color="text.primary"
                    gutterBottom
                >
                    My Movie Collection!
                </Typography>
                <Typography variant="h5" align="center" color="text.secondary" paragraph>
                    Browse through your collection! Or if you're looking to add a new title to your list, be sure to click below!
                </Typography>
                <Stack
                    sx={{ pt: 4 }}
                    direction="row"
                    spacing={2}
                    justifyContent="center"
                >
                    <Button
                        variant="contained"
                        sx={{ width: 300 }}
                        onClick={handleAddMovie}
                    >
                        Add a Movie
                    </Button>
                </Stack>
            </Container>
        </>
    )
}