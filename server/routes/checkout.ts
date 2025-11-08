import express, { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';
import { v4 as uuid } from 'uuid';

import { CartModel } from '../models/cart';
import { OrderModel } from '../models/order';
import type { ProductDocument } from '../models/product';

const router = express.Router();
const DEFAULT_USER_ID = 'guest';

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email } = req.body as { name?: string; email?: string };

    if (!name || !email) {
      throw createError(400, 'name and email are required');
    }

    const cart = await CartModel.findOne({ userId: DEFAULT_USER_ID }).populate('items.product').exec();

    if (!cart || cart.items.length === 0) {
      throw createError(400, 'Cart is empty');
    }

    const enrichedItems: Array<{
      product: ProductDocument;
      quantity: number;
      lineTotal: number;
    }> = [];

    for (const item of cart.items) {
      const product = item.product as unknown as ProductDocument | null;
      if (!product) {
        continue;
      }

      if (item.quantity > product.inventory) {
        throw createError(400, `Only ${product.inventory} units of ${product.name} available`);
      }

      enrichedItems.push({
        product,
        quantity: item.quantity,
        lineTotal: Number((product.price * item.quantity).toFixed(2)),
      });
    }

    if (enrichedItems.length === 0) {
      throw createError(400, 'Cart items are no longer available');
    }

    const total = Number(enrichedItems.reduce((sum, entry) => sum + entry.lineTotal, 0).toFixed(2));

    const order = await OrderModel.create({
      userId: DEFAULT_USER_ID,
      total,
      receiptCode: `receipt-${uuid()}`,
      items: enrichedItems.map((entry) => ({
        product: entry.product._id,
        quantity: entry.quantity,
        price: entry.product.price,
        lineTotal: entry.lineTotal,
      })),
      customer: {
        name,
        email,
      },
    });

    cart.items = [];
    await cart.save();

    const createdAtValue = order.get('createdAt') as Date | undefined;
    const createdAt =
      createdAtValue instanceof Date ? createdAtValue : new Date(createdAtValue ?? Date.now());

    res.status(201).json({
      receipt: {
        id: order.receiptCode,
        total: order.total,
        createdAt: createdAt.toISOString(),
        items: enrichedItems.map((entry) => ({
          product: {
            id: entry.product._id.toString(),
            name: entry.product.name,
            description: entry.product.description,
            price: entry.product.price,
            image: entry.product.image,
            inventory: entry.product.inventory,
            sizes: entry.product.sizes ?? [],
            colors: entry.product.colors ?? [],
          },
          quantity: entry.quantity,
          lineTotal: entry.lineTotal,
        })),
        customer: order.customer,
      },
    });
  } catch (error) {
    next(error);
  }
});

export default router;

