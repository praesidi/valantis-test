import { PRODUCTS_PER_PAGE } from '@/variables';
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import useFetchBrands from '@/hooks/useFetchBrands';
import useFetchProducts from '@/hooks/useFetchProducts';
import useGetProductsQnty from '@/hooks/useGetProductsQnty';
import ProductsSkeleton from './ProductsSkeleton';
import FiltersSkeleton from './FiltersSkeleton';
import Pagination from './Pagination';
import Products from './Products';
import Filters from './Filters';
import Error from './Error';

export default function Main() {
	const [searchParams, setSearchParams] = useSearchParams();

	useEffect(() => {
		const limit = String(PRODUCTS_PER_PAGE);

		searchParams.set('offset', '0');
		searchParams.set('limit', limit);
		setSearchParams(searchParams);
	}, []);

	const { data: productsQnty, error: productsQntyError } =
		useGetProductsQnty(searchParams);

	const {
		data: brands,
		isLoading: areBrandsLoading,
		error: brandError,
	} = useFetchBrands();

	const {
		data: products,
		isLoading: areProductsLoading,
		error: productsError,
	} = useFetchProducts(searchParams);

	if (brandError) {
		return <Error error={brandError} />;
	}

	if (productsQntyError) {
		return <Error error={productsQntyError} />;
	}

	if (productsError) {
		return <Error error={productsError} />;
	}

	function getPagesQnty() {
		if (productsQnty) {
			return Math.ceil(productsQnty / PRODUCTS_PER_PAGE);
		} else {
			return 0;
		}
	}

	return (
		<main className='flex flex-col p-2 flex-1'>
			{areBrandsLoading ? (
				<FiltersSkeleton />
			) : (
				<Filters
					brandOptions={brands}
					searchParams={searchParams}
					setSearchParams={setSearchParams}
				/>
			)}
			{areProductsLoading ? <ProductsSkeleton /> : <Products data={products} />}
			<Pagination
				searchParams={searchParams}
				setSearchParams={setSearchParams}
				maxPages={getPagesQnty()}
			/>
		</main>
	);
}
