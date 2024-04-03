import 'dotenv/config.js';
import express from 'express';
import userRoutes from './routes/userRoutes.js';

import mongoose from 'mongoose';

import path from 'path';

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log('connected to db'))
  .catch((err) => console.log(err.message));

const app = express();

app.use(express.json());

app.use('/api/users', userRoutes);

if (process.env.NODE_ENV === 'production') {
  const __dirname = path.resolve();
  console.log(__dirname);
  app.use(express.static(path.join(__dirname, '/client/dist')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'))
  );
} else {
  // const __dirname = path.resolve();
  // app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
  app.get('/', (req, res) => {
    res.send('API is running....');
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Running on port ${PORT}`));
