import express from 'express';
import dotenv from 'dotenv';
import routes from './routes/index';
import uploadConfig from './config/upload';
import './database';

dotenv.config();
const app = express();
app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

app.listen(3334, () => {
  console.log('Server is runing');
});
