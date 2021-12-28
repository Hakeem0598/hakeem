import { Filters } from "../../pages/products-page/Products-page.types"

export enum Sort {
    newest = '-createdAt',
    asc = 'price',
    desc = '-price'
}

export type SortKey = keyof typeof Sort;

export type ProductsProps = React.ComponentProps<'div'> & {
    filters: Filters
    sort: SortKey;
    category?: string;
    limit?: number;
}


