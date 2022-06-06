//const express = require('express')
import express from 'express';
const app = express();
const port = 3000;
//const { exec } = require("child_process");
import {exec} from 'child_process';

app.use('/static', express.static('static'))
app.use('/js', express.static('js'))
app.use('/jsm', express.static('jsm'))

app.use('/css', express.static('css'))


app.get('/', (req, res) => {
  res.sendFile('/home/runner/Mazer/web/index.html')
})

app.get('/maze', (req, res) => {
  const command = "dotnet run --configuration Release MarkovJunior.csproj";
  const workdir = "/home/runner/Mazer/web/MarkovJunior";
  exec(command , {cwd: workdir},
    (error, stdout, stderr) => {
      if (error) {
          console.log(`error: ${error.message}`);
          res.send("ERROR");
          return;
      }
      if (stderr) {
          console.log(`stderr: ${stderr}`);
          res.send("ERROR");
          return;
      }
      console.log(`stdout: ${stdout}`);
      // Parse and get output filename
      const txtArr = stdout.split('\n');
      const filename = '/home/runner/Mazer/web/MarkovJunior/' + txtArr[1].replace("Output = ","");
      res.sendFile(filename);
  });
})

app.get('/maze3D', (req, res) => {
  res.sendFile('/home/runner/Mazer/web/maze3D.html')
})

app.get('/ammo', (req, res) => {
  res.sendFile('/home/runner/Mazer/web/ammo.html')
})

app.get('/mazerunner', (req, res) => {
  res.sendFile('/home/runner/Mazer/web/mazerunner.html')
})

app.get('/mazepath', (req, res) => {
  res.sendFile('/home/runner/Mazer/web/mazepath.html')
})

app.listen(port, () => {
  console.log(`Mazer is listening on port ${port}`)
})
