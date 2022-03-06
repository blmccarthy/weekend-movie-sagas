const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

// Add query to get all MOVIE & GENRES via table JOIN
router.get('/', (req, res) => {
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
      console.log('in movies_genres.get.then');
      res.send(result.rows);
    }).catch(err => {
      console.log('router.get.catch ERROR:', err);
      res.sendStatus(500);
    })
  });

  router.post('/', (req, res) => {
    console.log('in movies_genres post');
    const query = `
        INSERT INTO movies_genres (movie_id, genre_id)
        VALUES ($1, $2);
    `
    pool.query(query [req.body.movie_id, req.body.genre_id])
    .then((result) => {
        console.log('in POST .then');
        res.sendStatus(200);
    }).catch((err) => {
        console.log('in POST .catch', err);
        res.sendStatus(500);
    })
  })

  module.exports = router;