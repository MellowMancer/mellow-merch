import { Schema, model, type HydratedDocument, type Types } from 'mongoose';

export interface CartItem {
  _id?: Types.ObjectId;
  product: Types.ObjectId;
  quantity: number;
}

export interface Cart {
  userId: string;
  items: CartItem[];
}

const cartItemSchema = new Schema<CartItem>(
  {
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true, min: 1 },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: (_doc, ret: Record<string, any>) => {
        ret.id = ret._id.toString();
        ret.productId = ret.product?.toString?.() ?? ret.product;
        delete ret._id;
        return ret;
      },
    },
  },
);

const cartSchema = new Schema<Cart>(
  {
    userId: { type: String, required: true, unique: true },
    items: { type: [cartItemSchema], default: [] },
  },
  { timestamps: true },
);

export type CartItemDocument = HydratedDocument<CartItem>;
export type CartDocument = HydratedDocument<Cart>;

export const CartModel = model<Cart>('Cart', cartSchema);
