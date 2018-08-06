const express = require('express');
const https = require('https')
const path = require('path');

const app = express();


app.use(express.static(path.join(__dirname, '')));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
});

const port = process.env.PORT || 8080;
app.set('port', port);

const server = https.createServer(app);
server.listen(port, () => console.log('running'));



    





