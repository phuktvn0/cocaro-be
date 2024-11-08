import express from 'express';
import {
  getAllProducts,
  getOneProduct,
  createProduct,
} from '../controllers/post/index';
import { protect } from '../middlewares/authentication';

const gameRouter: express.Router = express.Router();

gameRouter.get('/', getAllProducts);

gameRouter.get('/:id', getOneProduct);

gameRouter.post('/', protect as any, createProduct as any);

export default gameRouter;
