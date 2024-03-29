const express = require('express');
const paginate = require("express-paginate");
const bodyParser = require('body-parser');
const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();



const userRoutes = require('./routes/user');
const publicationRoutes = require('./routes/publication');
const commentRoutes = require('./routes/comment');
const likeRoutes = require('./routes/like');

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
  });

  app.use(cors());
  app.use(bodyParser.json());

  app.use('/api/auth', userRoutes);
  app.use('/api/publication', publicationRoutes);
  app.use('/api/comment', commentRoutes);
  app.use('/api/like', likeRoutes);
  app.use('/images', express.static(path.join(__dirname, 'images')));
  
  app.use(paginate.middleware(10, 50));

  module.exports = app;