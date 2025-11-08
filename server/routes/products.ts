import express, { Request, Response, NextFunction } from 'express';
import { ProductModel } from '../models/product';

const router = express.Router();

router.get('/', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await ProductModel.find().exec();
    res.json({ products: products.map((product) => product.toJSON()) });
  } catch (error) {
    next(error);
  }
});

export default router;

