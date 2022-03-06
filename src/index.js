import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

// ===== SAGA STORE ============================================================= //

// Create the rootSaga generator function
function* rootSaga() {
    yield takeEvery('ADD_MOVIE', addMovie);
    yield takeEvery('FETCH_MOVIES', fetchAllMovies);
    yield takeEvery('FETCH_GENRES', fetchAllGenres);
    yield takeEvery('FETCH_MOVIE_GENRES', fetchMovieGenres);
}

// ===== SAGA FUNCTIONS ========================================================= //

function* fetchAllMovies() {
    // get all MOVIES from the DB
    try {
        const movies = yield axios.get('/api/movie');
        console.log('get all movies:', movies.data);
        yield put({ type: 'SET_MOVIES', payload: movies.data });
    } catch {
        console.log('get all movies error');
    }
}

function* fetchAllGenres() {
    // get all GENRES from the DB
    try {
        const genres = yield axios.get('/api/genre');
        console.log('get all genres:', genres.data);
        yield put({ type: 'SET_GENRES', payload: genres.data });
    } catch {
        console.log('get all genres error');
    }
}

function* fetchMovieGenres() {
    // get all MOVIE & GENRES from Db (table JOIN)
    try {
        const movieGenres = yield axios.get('/api/movies_genres');
        console.log('get all movie genres:', movieGenres.data);
        yield put({ type: 'SET_MOVIE_GENRES', payload: movieGenres.data });
    } catch {
        console.log('get all genres error');
    }
}

function* addMovie(action) {
    // post MOVIE to Database
    try {
        console.log('in addMovie saga');
        axios.post('/api/movie', action.payload)
        yield put({ type: 'FETCH_MOVIES' });
    } catch (err) {
        console.log('add Movie Error', err);
    }
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// ===== REDUCERS ============================================================== //

// Used to store movies returned from the server
const movies = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return action.payload;
        default:
            return state;
    }
}

// Used to store the movie genres
const genres = (state = [], action) => {
    switch (action.type) {
        case 'SET_GENRES':
            return action.payload;
        default:
            return state;
    }
}

// Used to store the movie genres
const movieGenres = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIE_GENRES':
            return action.payload;
        default:
            return state;
    }
}


const selectedMovieReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_SELECTED_MOVIE':
            return action.payload;
        default:
            return state;
    }
}

// ===== REDUCER STORE =========================================================== //

// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        movies,
        genres,
        movieGenres,
        selectedMovieReducer,
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

// ===== RENDER DOM ============================================================ //

ReactDOM.render(
    <React.StrictMode>
        <Provider store={storeInstance}>
        <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
