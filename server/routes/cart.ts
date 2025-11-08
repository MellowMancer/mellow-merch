import express, { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';
import { Types } from 'mongoose';

import { CartModel, type CartDocument } from '../models/cart';
import { ProductModel, type ProductDocument } from '../models/product';

const router = express.Router();
const DEFAULT_USER_ID = 'guest';

async function getOrCreateCart(): Promise<CartDocument> {
  let cart = await CartModel.findOne({ userId: DEFAULT_USER_ID }).populate('items.product').exec();

  if (!cart) {
    cart = await CartModel.create({ userId: DEFAULT_USER_ID, items: [] });
    await cart.populate('items.product');
  }

  return cart as CartDocument;
}

function normalizeQuantity(quantity: unknown): number {
  const parsed = Math.floor(Number(quantity ?? 1));

  if (!Number.isFinite(parsed) || parsed <= 0) {
    throw createError(400, 'quantity must be greater than zero');
  }

  return parsed;
}

function ensureValidObjectId(id: string, fieldName: string): Types.ObjectId {
  if (!Types.ObjectId.isValid(id)) {
    throw createError(400, `${fieldName} is not a valid id`);
  }

  return new Types.ObjectId(id);
}

function buildCartSnapshot(cart: CartDocument) {
  const items = cart.items
    .filter((item) => Boolean(item.product))
    .map((item) => {
      const productDoc = item.product as unknown as ProductDocument;

      if (!productDoc) {
        return null;
      }

      const product = {
        id: productDoc._id.toString(),
        name: productDoc.name,
        description: productDoc.description,
        price: productDoc.price,
        image: productDoc.image,
        inventory: productDoc.inventory,
        sizes: productDoc.sizes ?? [],
        colors: productDoc.colors ?? [],
      };

      const lineTotal = Number((productDoc.price * item.quantity).toFixed(2));

      const itemId = item._id ? item._id.toString() : productDoc._id.toString();

      return {
        id: itemId,
        productId: product.id,
        quantity: item.quantity,
        lineTotal,
        product,
      };
    })
    .filter(Boolean) as Array<{
      id: string;
      productId: string;
      quantity: number;
      lineTotal: number;
      product: {
        id: string;
        name: string;
        description: string;
        price: number;
        image: string;
        inventory: number;
      };
    }>;

  const total = Number(items.reduce((sum, item) => sum + item.lineTotal, 0).toFixed(2));

  return { items, total };
}

async function refreshCart(cart: CartDocument) {
  await cart.populate('items.product');
  return buildCartSnapshot(cart);
}

router.get('/', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const cart = await getOrCreateCart();
    const snapshot = buildCartSnapshot(cart);
    res.json(snapshot);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { productId, quantity } = req.body as { productId?: string; quantity?: number };

    if (!productId) {
      throw createError(400, 'productId is required');
    }

    const objectId = ensureValidObjectId(productId, 'productId');
    const product = await ProductModel.findById(objectId).exec();

    if (!product) {
      throw createError(404, 'Product not found');
    }

    const cart = await getOrCreateCart();
    const addQuantity = normalizeQuantity(quantity);

    const existing = cart.items.find((item) => item.product?.toString() === product._id.toString());
    const newQuantity = (existing?.quantity ?? 0) + addQuantity;

    if (newQuantity > product.inventory) {
      throw createError(400, `Only ${product.inventory} units available`);
    }

    if (existing) {
      existing.quantity = newQuantity;
    } else {
      cart.items.push({
        product: product._id,
        quantity: addQuantity,
      } as any);
    }

    await cart.save();
    const snapshot = await refreshCart(cart);

    res.status(201).json({
      cart: snapshot,
    });
  } catch (error) {
    next(error);
  }
});

router.patch('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body as { quantity?: number };

    const cart = await getOrCreateCart();
    const itemsArray = cart.items as any;
    const item = itemsArray.id(id);

    if (!item) {
      throw createError(404, 'Cart item not found');
    }

    const product = await ProductModel.findById(item.product).exec();

    if (!product) {
      itemsArray.id(id)?.deleteOne();
      await cart.save();
      throw createError(404, 'Product not found');
    }

    if (quantity === undefined) {
      throw createError(400, 'quantity is required');
    }

    const normalizedQuantity = Math.floor(Number(quantity));

    if (!Number.isFinite(normalizedQuantity)) {
      throw createError(400, 'quantity must be a number');
    }

    if (normalizedQuantity <= 0) {
      item.deleteOne();
    } else {
      if (normalizedQuantity > product.inventory) {
        throw createError(400, `Only ${product.inventory} units available`);
      }

      item.quantity = normalizedQuantity;
    }

    await cart.save();
    const snapshot = await refreshCart(cart);

    res.json({ cart: snapshot });
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const cart = await getOrCreateCart();
    const itemsArray = cart.items as any;
    const item = itemsArray.id(id);

    if (!item) {
      throw createError(404, 'Cart item not found');
    }

    item.deleteOne();
    await cart.save();
    const snapshot = await refreshCart(cart);

    res.json({ cart: snapshot });
  } catch (error) {
    next(error);
  }
});

export default router;
