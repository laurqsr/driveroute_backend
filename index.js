import express from 'express';
import routes from './src/routes/routes.js';

const app = express();

app.use(express.json());

app.listen(5000, () => {
  console.log("localhost:5000");
});

app.use(routes);