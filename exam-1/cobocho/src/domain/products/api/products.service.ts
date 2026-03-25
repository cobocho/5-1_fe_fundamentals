import type {
	AutoCompleteRequest,
	AutoCompleteResponse,
	ProductsResponse,
	ProductsRequest,
} from './products.types';

import { kyInstance } from '../../../libs/http';

export const productsService = {
	getProducts: async (params: ProductsRequest) => {
		return kyInstance.get<ProductsResponse>('/api/products', {
			searchParams: {
				categories: params.categories.join(','),
				keyword: params.keyword,
				sort: params.sort,
				page: params.page,
				size: params.size,
			},
		});
	},
	getAutoComplete: async (params: AutoCompleteRequest) => {
		return kyInstance.get<AutoCompleteResponse>('/api/autocomplete', {
			searchParams: {
				keyword: params.keyword,
			},
		});
	},
};
