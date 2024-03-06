import { Filter, Product } from '@/types';
import { useEffect, useState } from 'react';
import api from '@/lib/axiosInstance';

export default function useFetchProducts(
	filters: Filter,
	offset: number,
	limit: number,
) {
	const [data, setData] = useState<Product[] | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	// const maxRetries = 3;
	// const retryDelay = 2500;

	useEffect(() => {
		// let retries = 0;
		setIsLoading(true);

		async function fetchData() {
			console.log('fetch products');
			console.log(filters);

			try {
				const response = await api.post('', getOptions(filters, offset, limit));
				const ids: string[] = await response.data.result;

				const lastResponse = await api.post('', {
					'action': 'get_items',
					'params': {
						ids: ids,
					},
				});
				let data: Product[] = await lastResponse.data.result;

				// get_items method doesn't have offset and limit parameters
				if (filters.brand || filters.product || filters.price) {
					data = data.slice(offset, offset + limit);
				}

				setData(data);
			} catch (error) {
				// if (retries < maxRetries) {
				// 	retries++;
				// 	setTimeout(fetchData, retryDelay);
				// } else {
				// 	setError(`Something went wrong while fetching data: ${error}`);
				// }

				setError(`Something went wrong while fetching data: ${error}`);
			}
			setIsLoading(false);
		}
		fetchData();
	}, [filters, offset]);

	return { data, isLoading, error };
}

function getOptions(filters: Filter, offset = 0, limit = 50) {
	switch (true) {
		case filters.brand !== null:
			return {
				'action': 'filter',
				'params': {
					brand: filters.brand,
				},
			};

		case filters.price !== null:
			return {
				'action': 'filter',
				'params': {
					price: filters.price,
				},
			};

		case filters.product !== null:
			return {
				'action': 'filter',
				'params': {
					product: filters.product,
				},
			};

		default:
			return {
				'action': 'get_ids',
				'params': {
					offset: offset,
					limit: limit,
				},
			};
	}
}
