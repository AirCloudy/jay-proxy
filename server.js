require('newrelic');

const express = require('express');
const requestPromise = require('request-promise');
const path = require('path');

const PORT = 4000;

const app = express();

app.use(express.json());

app.use('/:songid', express.static(path.join(__dirname, './')));

// GET SONG VIA SERVICE SERVER
app.get('/songs/:songId/:userId', (req, res) => {
  const { songId, userId } = req.params;
  const options = {
    uri: `http://localhost:3000/songs/${songId}/${userId}`,
    json: true
  };
  // send request to component
  requestPromise(options)
    .then(response => {
      res.end(JSON.stringify(response.rows[0]));
    })
    .catch(error => {
      res.end(error);
    });
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
