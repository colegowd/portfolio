const express = require('express');
const next = require('next');
const mongoose = require('mongoose');
const routes = require('../routes');

const authService = require('./services/auth');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handler = routes.getRequestHandler(app);


const secretData = [
  {
    title: 'SecretData 1',
    description: 'Plans how to build spaceship'
  },
  {
    title: 'SecretData 2',
    description: 'My secret passwords'
  }
]

mongoose.connect('mongodb://cole:testtest1@ds063769.mlab.com:63769/portfolio-dev', { useNewUrlParser: true})
  .then(() => console.log('Database Connected!'))
  .catch(err => console.log(err))

app.prepare()
.then(() => {
  const server = express();


  server.get('/api/v1/secret', authService.checkJWT, (req, res) => {
    return res.json(secretData);
  })

  server.get('/api/v1/onlysiteowner', authService.checkJWT, authService.checkRole('siteOwner'), (req, res) => {
    return res.json(secretData);
  })


  server.get('*', (req, res) => {
    return handler(req, res);
  })

  server.use(function (err, req, res, next) {
    if(err.name === 'UnauthorizedError') {
      res.status(401).send({title: 'Unauthorized', detail: 'Unauthorized Access!'});
    } 
  });

  server.use(handler).listen(3000, (err) => {
    if(err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})