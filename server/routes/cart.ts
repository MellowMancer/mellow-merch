import express, { Request, Response } from 'express';
import createError from 'http-errors';
import { products } from '../data/products';
import { cartService, calculateCartTotal, toCartLines } from '../services/cartService';

const router = express.Router();

router.get('/', (_req: Request, res: Response) => {
  const lines = toCartLines(cartService.list(), products);
  const total = calculateCartTotal(lines);

  res.json({
    items: lines,
    total,
  });
});

router.post('/', (req: Request, res: Response, next) => {
  try {
    const { productId, quantity } = req.body as { productId?: string; quantity?: number };

    if (!productId) {
      throw createError(400, 'productId is required');
    }

    const product = products.find((item) => item.id === productId);

    if (!product) {
      throw createError(404, 'Product not found');
    }

    const normalizedQuantity = Math.max(1, Math.floor(Number(quantity ?? 1)));

    if (!Number.isFinite(normalizedQuantity) || normalizedQuantity <= 0) {
      throw createError(400, 'quantity must be greater than zero');
    }

    const existingLine = cartService.list().find((item) => item.productId === productId);
    const newQuantity = (existingLine?.quantity ?? 0) + normalizedQuantity;

    if (newQuantity > product.inventory) {
      throw createError(400, `Only INR {product.inventory} units available`);
    }

    const cartItem = cartService.add(productId, normalizedQuantity);
    const lines = toCartLines(cartService.list(), products);

    res.status(201).json({
      item: cartItem,
      cart: {
        items: lines,
        total: calculateCartTotal(lines),
      },
    });
  } catch (error) {
    next(error);
  }
});

router.patch('/:id', (req: Request, res: Response, next) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body as { quantity?: number };

    if (quantity === undefined) {
      throw createError(400, 'quantity is required');
    }

    const normalizedQuantity = Math.floor(Number(quantity));

    if (!Number.isFinite(normalizedQuantity)) {
      throw createError(400, 'quantity must be a number');
    }

    const existing = cartService.get(id);

    if (!existing) {
      throw createError(404, 'Cart item not found');
    }

    const product = products.find((item) => item.id === existing.productId);

    if (!product) {
      cartService.remove(id);
      throw createError(404, 'Product not found');
    }

    if (normalizedQuantity <= 0) {
      cartService.remove(id);
    } else {
      if (normalizedQuantity > product.inventory) {
        throw createError(400, `Only INR {product.inventory} units available`);
      }

      cartService.update(id, normalizedQuantity);
    }

    const lines = toCartLines(cartService.list(), products);

    res.json({
      cart: {
        items: lines,
        total: calculateCartTotal(lines),
      },
    });
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', (req: Request, res: Response, next) => {
  try {
    const { id } = req.params;
    const removed = cartService.remove(id);

    if (!removed) {
      throw createError(404, 'Cart item not found');
    }

    const lines = toCartLines(cartService.list(), products);

    res.status(200).json({
      cart: {
        items: lines,
        total: calculateCartTotal(lines),
      },
    });
  } catch (error) {
    next(error);
  }
});

export default router;

