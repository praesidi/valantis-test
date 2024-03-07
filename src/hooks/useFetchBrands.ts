import api from '@/lib/axiosInstance';
import { useEffect, useState } from 'react';
import { Brands } from '@/types';

export default function useFetchBrands() {
	const [data, setData] = useState<(string | null)[] | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const maxRetries = 3;
	const retryDelay = 2000;

	useEffect(() => {
		let retries = 0;
		setIsLoading(true);

		async function fetchData() {
			try {
				const response = await api.post('', {
					'action': 'get_fields',
					'params': {
						'field': 'brand',
					},
				});
				const data: Brands = await response.data.result;
				const filtered = [...new Set(data)];
				setData(filtered);
			} catch (error) {
				if (retries < maxRetries) {
					retries++;
					setTimeout(fetchData, retryDelay);
				} else {
					setError(
						`Something went wrong while getting data about brands: ${error}`,
					);
				}
			}
			setIsLoading(false);
		}
		fetchData();
	}, []);

	return { data, isLoading, error };
}
