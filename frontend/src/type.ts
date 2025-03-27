
export interface IVariant {
    color: string;
    size: string;
    stock: number;
    price?: number;
    _id?: string;
}


export interface IProduct {
    _id?: string;
    name: string;
    description: string;
    price: number;
    categoryId: ICategory | string;
    images: string[];
    variants?: IVariant[];
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ICategory {
    _id?: string;
    categoryName: string;
    image?: string
}