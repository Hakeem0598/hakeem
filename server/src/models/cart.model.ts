import mongoose, { Document, Model } from 'mongoose';
import { ProductAndQuantity } from './product.model';
import { UserDocument } from './user.model';

export type CartInput = {
    user: UserDocument['_id'];
    products: ProductAndQuantity[];
}

export type CartDocument = CartInput & Document & {
    createdAt: Date;
    updatedAt: Date;
}

const cartSchema = new mongoose.Schema<CartDocument, Model<CartDocument>>(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        products: [
            {
                product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
                quantity: { type: Number, default: 1 },
            }
        ]
    },
    {
        timestamps: true
    }
)

// QUERY MIDDLEWARE
cartSchema.pre(/^find/, function(this, next) {
    this.populate([{ path: 'user' }, { path: 'products' }]);
    next()
})

const Cart = mongoose.model<CartDocument>('Cart', cartSchema);

export default Cart;