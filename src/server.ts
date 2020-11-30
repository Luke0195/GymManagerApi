import express from 'express';
import dotenv from 'dotenv';
import routes from './routes/index';
import './database';

dotenv.config();
const app = express();
app.use(express.json());
app.use(routes);

app.listen(3334, () => {
  console.log('Server is runing');
});
