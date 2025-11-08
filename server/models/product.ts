import { Schema, model, type HydratedDocument } from 'mongoose';

export interface Product {
  name: string;
  description: string;
  price: number;
  image?: string;
  inventory: number;
  sku: string;
  sizes: string[];
  colors: string[];
}

const productSchema = new Schema<Product>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, default: '' },
    inventory: { type: Number, required: true, min: 0 },
    sku: { type: String, required: true, unique: true },
    sizes: { type: [String], default: [] },
    colors: { type: [String], default: [] },
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

export type ProductDocument = HydratedDocument<Product>;

export const ProductModel = model<Product>('Product', productSchema);

