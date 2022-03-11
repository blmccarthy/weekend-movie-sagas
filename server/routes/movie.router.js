const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

// ==== GET ========================================================== //

router.get('/', (req, res) => {

  const query = `SELECT * FROM movies ORDER BY "title" ASC`;
  pool.query(query)
    .then( result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('ERROR: Get all movies', err);
      res.sendStatus(500)
    })

});

router.get('/:id', (req, res) => {
  console.log('in get /id', req.params.id)
  reqId = req.params.id;
  const query = `SELECT * FROM movies WHERE id = $1;`;
  pool.query(query, [reqId])
    .then( result => {
      console.log('get /:id response', result.rows)
      res.send(result.rows);
    })
    .catch(err => {
      console.log('ERROR: Get all movies', err);
      res.sendStatus(500)
    })

});


// ==== POST ========================================================= //


router.post('/', (req, res) => {
  console.log('in movie post', req.body);
  // RETURNING "id" will give us back the id of the created movie
  const insertMovieQuery = `
  INSERT INTO "movies" ("title", "poster", "description")
  VALUES ($1, $2, $3)
  RETURNING "id";`

  // FIRST QUERY MAKES MOVIE
  pool.query(insertMovieQuery, [req.body.title, req.body.poster, req.body.description])
  .then(result => {
    console.log('New Movie Id:', result.rows[0].id); //ID IS HERE!
    
    const createdMovieId = result.rows[0].id

    // Now handle the genre reference
    const insertMovieGenreQuery = `
      INSERT INTO "movies_genres" ("movie_id", "genre_id")
      VALUES  ($1, $2);
      `
      // SECOND QUERY ADDS GENRE FOR THAT NEW MOVIE
      pool.query(insertMovieGenreQuery, [createdMovieId, req.body.genre_id]).then(result => {
        //Now that both are done, send back success!
        res.sendStatus(201);
      }).catch(err => {
        // catch for second query
        console.log(err);
        res.sendStatus(500)
      })

// Catch for first query
  }).catch(err => {
    console.log(err);
    res.sendStatus(500)
  })
})

// ==== PUT ========================================================== //

router.put('/:id', (req, res) => {
  const movie = req.body;
  // Updates Movie Table
  const updateMovieQuery = `
    UPDATE movies 
    SET
      title = $1,
      poster = $2,
      description = $3
    WHERE
      id = $4;
  `
  pool.query(updateMovieQuery, [movie.title, movie.poster, movie.description, movie.id])
  .then((result) => {
    // Updates movies_genres table with new Genre
    const updateGenreQuery = `
      UPDATE movies_genres
      SET
        genre_id = $1
      WHERE
        movie_id = $2
    `
    pool.query(updateGenreQuery, [movie.genre_id, movie.id])
    .then(result => {
      res.sendStatus(200);
    }).catch(err => {
      console.log('ERROR: In movie/put', err);
      res.sendStatus(500);
    })
  }).catch(err => {
    console.log('ERROR: In movie/put', err);
    res.sendStatus(500);
  })
})

// ==== EXPORT ======================================================= //

module.exports = router;