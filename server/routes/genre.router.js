const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

// Add query to get all genres
router.get('/', (req, res) => {
  const query = `SELECT * FROM genres;`
  pool.query(query).then((result) => {
    console.log('in router.get.then');
    res.send(result.rows);
  }).catch(err => {
    console.log('router.get.catch ERROR:', err);
    res.sendStatus(500);
  })
});

module.exports = router;