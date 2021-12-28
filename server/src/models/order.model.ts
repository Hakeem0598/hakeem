import mongoose, { Document, Model } from 'mongoose';
import { ProductAndQuantity } from './product.model';
import { UserDocument } from './user.model';

export type OrderInput = {
   user: UserDocument['_id'];
   products: ProductAndQuantity[];
   amount: number;
   address: { [key: string]: any };
   status?: string;
}

export type OrderDocument = OrderInput & Document & {
    createdAt: Date;
    updatedAt: Date;
}

const orderSchema = new mongoose.Schema<OrderDocument, Model<OrderDocument>>(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        products: [
            {
                product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
                quantity: { type: Number, default: 1 },
            }
        ],
        amount: { type: Number, required: true },
        address: { type: Object, required: true },
        status: { type: String, default: 'pending' }
    },
    {
        timestamps: true
    }
)

orderSchema.pre(/^find/, function(this, next) {
    this.populate([{ path: 'user', select: '-_id-__v' }, { path: 'products.product', select: '-_id-__v' }]);
    next()
})

const Order = mongoose.model<OrderDocument>('Order', orderSchema);

export default Order;