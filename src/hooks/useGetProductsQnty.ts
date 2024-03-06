import api from '@/lib/axiosInstance';
import { useEffect, useState } from 'react';
import { Filter } from '@/types';

export default function useGetProductsQnty(filters: Filter) {
	const [data, setData] = useState<number | null>(null);
	const [error, setError] = useState<string | null>(null);
	// const maxRetries = 3;
	// const retryDelay = 2500;

	useEffect(() => {
		// let retries = 0;

		async function fetchData() {
			console.log('getting products qnty');

			try {
				let response = null;

				if (!filters.brand && !filters.price && !filters.product) {
					response = await api.post('', {
						'action': 'get_ids',
						'params': {},
					});
				} else {
					response = await api.post('', getOptions(filters));
				}

				const data = await response.data.result;
				setData(data.length);
			} catch (error) {
				// if (retries < maxRetries) {
				// 	retries++;
				// 	setTimeout(fetchData, retryDelay);
				// } else {
				// 	setError(
				// 		`Something went wrong while getting products quantity: ${error}`,
				// 	);
				// }

				setError(
					`Something went wrong while getting products quantity: ${error}`,
				);
			}
		}
		fetchData();
	}, [filters]);

	return { data, error };
}

function getOptions(filters: Filter, offset = 0, limit = 49) {
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
