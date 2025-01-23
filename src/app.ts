import express from 'express';
import cors from 'cors';
import boardRoutes from './routes/board.routes';
import cardRoutes from './routes/card.routes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/board', boardRoutes);
app.use('/api/cards', cardRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});