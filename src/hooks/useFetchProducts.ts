import { Product } from '@/types';
import { useEffect, useState } from 'react';
import api from '@/lib/axiosInstance';

export default function useFetchProducts(searchParams: URLSearchParams) {
	const [data, setData] = useState<Product[] | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const maxRetries = 3;
	const retryDelay = 2500;

	useEffect(() => {
		let retries = 0;
		const offset = Number(searchParams.get('offset'));
		const limit = Number(searchParams.get('limit'));

		async function fetchData() {
			setIsLoading(true);

			try {
				const options = getOptions(searchParams, offset, limit);
				const response = await api.post('', options);
				const ids: string[] = await response.data.result;

				const lastResponse = await api.post('', {
					'action': 'get_items',
					'params': {
						ids: ids,
					},
				});
				let data: Product[] = await lastResponse.data.result;

				// get_items method doesn't have offset and limit parameters
				if (
					(searchParams.get('brand') && searchParams.get('brand') !== 'all') ||
					searchParams.get('product') ||
					searchParams.get('price')
				) {
					data = data.slice(offset, offset + limit);
				}

				setData(data);
				setIsLoading(false);
			} catch (error) {
				if (retries < maxRetries) {
					retries++;
					setTimeout(fetchData, retryDelay);
				} else {
					setIsLoading(false);
					setError(`Something went wrong while fetching data: ${error}`);
				}
			}
		}
		fetchData();
	}, [searchParams]);

	return { data, isLoading, error };
}

function getOptions(
	searchParams: URLSearchParams,
	offset: number,
	limit: number,
) {
	switch (true) {
		case !!searchParams.get('brand') && searchParams.get('brand') !== 'all':
			return {
				'action': 'filter',
				'params': {
					brand: searchParams.get('brand') || '',
				},
			};

		case !!searchParams.get('price'):
			return {
				'action': 'filter',
				'params': {
					price: Number(searchParams.get('price')) || '',
				},
			};

		case !!searchParams.get('product'):
			return {
				'action': 'filter',
				'params': {
					product: searchParams.get('product') || '',
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
