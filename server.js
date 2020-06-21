const express = require('express');
const https = require('https');
const fs = require('fs');

const privateKey  = fs.readFileSync('sslcert/server.key', 'utf8');
const certificate = fs.readFileSync('sslcert/server.crt', 'utf8');
const credentials = {key: privateKey, cert: certificate};

const app = express();

app.use(express.static('./dist'));
app.use(express.json())

app.all("*", (_req, res) => {
  try {
    // res.sendFile('/home/matheus/app/moment-frontend/dist/index.html');
    res.sendFile('/home/matheus/projetos/moment-frontend/dist/index.html');
  } catch (error) {
    const json = {
      message: "Página não encontrada!"
    }
    res.status(404).send(json)
  }
});

const httpsServer = https.createServer(credentials, app);

httpsServer.listen(8080);
