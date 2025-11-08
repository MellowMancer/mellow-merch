import { Schema, model, type HydratedDocument, type Types } from 'mongoose';

export interface OrderItem {
  product: Types.ObjectId;
  quantity: number;
  price: number;
  lineTotal: number;
}

export interface Order {
  userId: string;
  total: number;
  items: OrderItem[];
  receiptCode: string;
  customer: {
    name: string;
    email: string;
  };
}

const orderItemSchema = new Schema<OrderItem>(
  {
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true },
    lineTotal: { type: Number, required: true },
  },
  { _id: false },
);

const orderSchema = new Schema<Order>(
  {
    userId: { type: String, required: true },
    total: { type: Number, required: true },
    items: { type: [orderItemSchema], default: [] },
    receiptCode: { type: String, required: true, unique: true },
    customer: {
      name: { type: String, required: true },
      email: { type: String, required: true },
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: (_doc, ret: Record<string, any>) => {
        ret.id = ret._id.toString();
        delete ret._id;
        return ret;
      },
    },
  },
);

export type OrderDocument = HydratedDocument<Order>;

export const OrderModel = model<Order>('Order', orderSchema);
