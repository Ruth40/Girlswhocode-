const express = require('express');
const bodyParser = require('body-parser');
const jsonfile = require('jsonfile');
const path = require('path');
const dataFile = './data.json';
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/get-journals', (req, res) => {
  jsonfile.readFile(dataFile, (err, obj) => {
    if (err) console.log('Error on reading: ', err);
    res.json(obj.stories);
  });
});

app.post('/save-journal', (req, res) => {
  const { username, subject } = req.body;
  const story = {
    userName: username,
    subject: subject
  };
  let stories = {};

  jsonfile.readFile(dataFile, (err, obj) => {
    if (err) console.log('Error on reading: ', err);

    obj.stories.push(story);
    stories = obj.stories;

    jsonfile.writeFile(dataFile, obj, err => {
      if (err) console.log('Error on writing: ', err);
      res.json(stories);
    });
  });
});

app.listen(port, () => console.log(`App listening on port ${port}!`));
