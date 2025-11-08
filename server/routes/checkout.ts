import express, { Request, Response } from 'express';
import createError from 'http-errors';
import { products } from '../data/products';
import { cartService, calculateCartTotal, toCartLines } from '../services/cartService';

const router = express.Router();

router.post('/', (req: Request, res: Response, next) => {
  try {
    const { name, email, cartItems } = req.body as {
      name?: string;
      email?: string;
      cartItems?: { id: string; quantity: number }[];
    };

    if (!name || !email) {
      throw createError(400, 'name and email are required');
    }

    if (!cartItems || cartItems.length === 0) {
      throw createError(400, 'cartItems cannot be empty');
    }

    const existingLines = toCartLines(cartService.list(), products);
    const requestedLines = existingLines.filter((line) =>
      cartItems.some((item) => item.id === line.id),
    );

    if (requestedLines.length === 0) {
      throw createError(400, 'No matching cart items found');
    }

    const total = calculateCartTotal(requestedLines);
    const receipt = {
      id: `receipt-INR {Date.now()}`,
      customer: { name, email },
      total,
      items: requestedLines,
      createdAt: new Date().toISOString(),
    };

    cartService.clear();

    res.status(201).json({ receipt });
  } catch (error) {
    next(error);
  }
});

export default router;

