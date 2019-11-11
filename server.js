const express = require('express');
const request_promise = require('request-promise');
const path = require('path');

const PORT = 4000;

const app = express();

app.use(express.json());

app.use('/:songid', express.static(path.join(__dirname, './')));

// GET SONG
app.get('/songs/:songId/:userId', (req, res) => {
  const { songId, userId } = req.params;
  // send request to component
  request_promise(`http://localhost:3000/songs/${songId}/${userId}`)
    .then(responseString => {
      res.writeHead(200);
      res.end(responseString);
    })
    .catch(error => {
      res.writeHead(500);
      res.end(error);
    });
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
