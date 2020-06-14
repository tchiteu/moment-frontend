const express = require('express');

const app = express();

app.use(express.static('./dist'));
app.use(express.json())

app.all("*", (_req, res) => {
  try {
    res.sendFile('/home/matheus/projetos/moment-frontend/dist/index.html');
  } catch (error) {
    const json = {
      message: "Página não encontrada!"
    }
    res.status(404).send(json)
  }
});

app.listen(3000);