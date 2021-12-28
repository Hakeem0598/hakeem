import mongoose, { Document, Model } from 'mongoose';
import slugify from 'slugify';

type Category = 'men' | 'women';
type Size = 'xs' | 's' | 'm' | 'l' | 'xl';
type Color = 'white' | 'black' | 'red' | 'blue' | 'yellow' | 'green' | "pink" | "gray";

export type ProductAndQuantity = {
    product: ProductDocument['_id'];
    quantity: number;
}

export type ProductInput = {
    title: string;
    description: string;
    image: string;
    category: Category;
    sizes?: Size[];
    colors?: Color[];
    price: number;
    inStock: boolean;
}

export type ProductDocument = ProductInput & Document & {
    createdAt: Date;
    updatedAt: Date;
    slug: string;
}

const productSchema = new mongoose.Schema<ProductDocument, Model<ProductDocument>>(
    {
        title: { type: String, required: true, unique: true },
        description: { type: String, required: true, },
        image: { type: String, required: true },
        category: { type: String, required: true },
        sizes: { type: [String], required: true },
        colors: { type: [String], required: true },
        price: { type: Number, required: true },
        inStock: { type: Boolean, default: true },
        slug: String
    },
    {
        timestamps: true
    }
)

productSchema.pre('save', function(this, next) {
    if (!this.isModified('title')) return next();

    this.slug = slugify(this.title, { lower: true });
    next()
})

const Product = mongoose.model<ProductDocument>('Product', productSchema);

export default Product;