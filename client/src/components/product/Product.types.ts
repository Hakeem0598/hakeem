export type ProductProps = {
    _id: string;
    title: string;
    description: string;
    image: string;
    category: string;
    sizes: string[];
    colors: string[];
    price: number;
    inStock: boolean;
    slug: string;
}