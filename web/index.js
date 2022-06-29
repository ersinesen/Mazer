//const express = require('express')
import express from 'express';
const app = express();
const port = 3000;
//const { exec } = require("child_process");
import {exec} from 'child_process';
import showdown from 'showdown';
import fs from 'fs';

showdown.setFlavor('github');

app.use('/static', express.static('static'))
app.use('/js', express.static('js'))
app.use('/jsm', express.static('jsm'))
app.use('/mazestore', express.static('MarkovJunior/output'))

app.use('/css', express.static('css'))


app.get('/', (req, res) => {
  //res.sendFile('/home/runner/Mazer/web/README.md')
  let converter = new showdown.Converter({completeHTMLDocument: true, flavor: 'github'});      
  //converter.setFlavor('github');
  
  try {
    const data = fs.readFileSync('/home/runner/Mazer/README.md', 'utf8');
    let html = converter.makeHtml(data);
    html = html.replace('<head>', '<head>\n<title>Mazer</title>\n<link rel="icon" type="image/x-icon" href="/static/mazerunner_favicon.png">');
    res.send(html);
  } catch (err) {
    console.error(err);
    res.send('ERROR')
  }
  
})

app.get('/maze', (req, res) => {
  // get parameters
  let W = parseInt(req.query.width) ? req.query.width : 20;
  let H = parseInt(req.query.height) ? req.query.height: 20;
  // hard limit
  W = W>100 ? 100 : W;
  H = H>100 ? 100 : H;
  
  //console.log(W, H);
  const command = "dotnet run --configuration Release MarkovJunior.csproj " + Math.ceil(W/2) + " " + Math.ceil(H/2);
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

app.get('/mazeurl', (req, res) => {
  // get parameters
  let W = parseInt(req.query.width) ? req.query.width : 20;
  let H = parseInt(req.query.height) ? req.query.height: 20;
  // hard limit
  W = W>100 ? 100 : W;
  H = H>100 ? 100 : H;
  
  //console.log(W, H);
  const command = "dotnet run --configuration Release MarkovJunior.csproj " + Math.ceil(W/2) + " " + Math.ceil(H/2);
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
      res.send(filename);
  });
})

app.get('/mazerunner', (req, res) => {
  res.sendFile('/home/runner/Mazer/web/mazerunner.html')
})

app.get('/mazerunner/random', (req, res) => {
  res.sendFile('/home/runner/Mazer/web/mazerunner_random.html')
})

app.get('/mazepath', (req, res) => {
  res.sendFile('/home/runner/Mazer/web/mazepath.html')
})

app.listen(port, () => {
  console.log(`Mazer is listening on port ${port}`)
})
