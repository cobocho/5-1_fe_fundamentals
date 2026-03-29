import type { Product } from '@/types';
import productsJson from '../../../shared/products.json';

export const products = productsJson as Product[];
