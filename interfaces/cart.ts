import { ISize } from './';

export interface ICartProduct {
    description: string;
    _id: string;
    images: string[];
    price: number;
    size: ISize;
    slug: string;
    title: string;
    gender: 'men'|'women'|'kid'|'unisex';
    quantity: number;
}
