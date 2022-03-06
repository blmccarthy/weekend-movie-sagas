const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

router.get('/', (req, res) => {
  // Add query to get all genres
  const query = `SELECT * FROM genres;`
  pool.query(query).then((result) => {
    console.log('in router.get.then');
    res.send(result.rows);
  }).catch(err => {
    console.log('router.get.catch ERROR:', err);
    res.sendStatus(500);
  })
});

router.get('/moviejoin', (req, res) => {
  // Add query to get all MOVIE & GENRES via table JOIN
  const query = `
    SELECT 
    movies_genres.id AS id,
    movies_genres.movie_id,
    movies.title,
    movies_genres.genre_id,
    genres.name AS genre
  FROM  movies 
  JOIN  movies_genres
  ON    movies.id = movies_genres.movie_id
  JOIN  genres
  ON    genres.id = movies_genres.genre_id
  ORDER BY movie_id;
  `
  pool.query(query).then((result) => {
    console.log('in moviejoin.get.then');
    res.send(result.rows);
  }).catch(err => {
    console.log('router.get.catch ERROR:', err);
    res.sendStatus(500);
  })
});

module.exports = router;