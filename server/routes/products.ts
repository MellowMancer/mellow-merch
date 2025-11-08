import express, { Request, Response } from 'express';
import { products } from '../data/products';

const router = express.Router();

router.get('/', (_req: Request, res: Response) => {
  res.json({ products });
});

export default router;

