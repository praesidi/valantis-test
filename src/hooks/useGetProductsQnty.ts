import api from '@/lib/axiosInstance';
import { useEffect, useState } from 'react';

export default function useGetProductsQnty(searchParams: URLSearchParams) {
	const [data, setData] = useState<number | null>(null);
	const [error, setError] = useState<string | null>(null);
	const maxRetries = 3;
	const retryDelay = 2500;

	useEffect(() => {
		let retries = 0;

		async function fetchData() {
			try {
				let response = null;

				if (
					searchParams.get('brand') === 'all' ||
					(!searchParams.get('brand') &&
						!searchParams.get('price') &&
						!searchParams.get('product'))
				) {
					response = await api.post('', {
						'action': 'get_ids',
						'params': {},
					});
				} else {
					const options = getOptions(searchParams);
					response = await api.post('', options);
				}

				const data = await response.data.result;
				setData(data.length);
			} catch (error) {
				if (retries < maxRetries) {
					retries++;
					setTimeout(fetchData, retryDelay);
				} else {
					setError(
						`Something went wrong while getting products quantity: ${error}`,
					);
				}
			}
		}
		fetchData();
	}, [searchParams]);

	return { data, error };
}

function getOptions(searchParams: URLSearchParams) {
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
				'params': {},
			};
	}
}
