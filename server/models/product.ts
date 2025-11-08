import { Schema, model, type InferSchemaType } from 'mongoose';

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    inventory: { type: Number, required: true, min: 0 },
    sku: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: (_doc, ret) => {
        ret.id = ret._id.toString();
        delete ret._id;
        return ret;
      },
    },
  },
);

export type ProductDocument = InferSchemaType<typeof productSchema>;

export const ProductModel = model('Product', productSchema);

