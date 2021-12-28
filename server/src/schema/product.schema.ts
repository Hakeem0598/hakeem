import { object, string, number, boolean, array } from 'yup';

export const createProductSchema = object({
    body: object({
        title: string().required('Title is required'),
        description: string().required('Description is required'),
        image: string().required('Image is required'),
        category: string().matches(/(men|women)/).required('Category is required'),
        sizes: array().of(string().oneOf(["xs", "s", "m", "l", "xl"])).required('Sizes are required'),
        colors: array().of(string().oneOf(["white", "black", "red", "blue", "yellow", "green", "pink", "gray"])).required('Colors are required'),
        price: number().required('Price is required'),
        inStock: boolean(),
    })
})

export const getProductsSchema = object({
    params: object({
        category: string().matches(/(men|women)/).required('Category is required')
    })
})

