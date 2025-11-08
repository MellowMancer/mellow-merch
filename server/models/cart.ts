import { Schema, model, type InferSchemaType, type Types } from 'mongoose';

const cartItemSchema = new Schema(
  {
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true, min: 1 },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: (_doc, ret) => {
        ret.id = ret._id.toString();
        ret.productId = ret.product?.toString?.() ?? ret.product;
        delete ret._id;
        return ret;
      },
    },
  },
);

const cartSchema = new Schema(
  {
    userId: { type: String, required: true, unique: true },
    items: { type: [cartItemSchema], default: [] },
  },
  { timestamps: true },
);

cartSchema.methods.findItem = function (productId: Types.ObjectId) {
  return this.items.find(
    (item: { product: Types.ObjectId; quantity: number }) => item.product.equals(productId),
  );
};

export type CartDocument = InferSchemaType<typeof cartSchema> & {
  findItem(productId: Types.ObjectId): (typeof cartSchema)['paths'];
};

export const CartModel = model('Cart', cartSchema);

