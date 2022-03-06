const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

router.get('/', (req, res) => {
  // Add query to get all genres
  const query = `
    SELECT 
      movies_genres.id, 
      movies.title, 
      genres.name AS genre

    FROM  movies 
    JOIN  movies_genres
    ON    movies.id = movies_genres.movie_id
    JOIN  genres
    ON    genres.id = movies_genres.genre_id;
  `
  pool.query(query).then((result) => {
    console.log('in router.get.then');
    res.send(result.rows);
  }).catch (err => {
    console.log('router.get.catch ERROR:', err);
    res.sendStatus(500);
  })
});

module.exports = router;