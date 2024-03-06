import { PRODUCTS_PER_PAGE } from '@/variables';
import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';
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
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [searchParams, setSearchParams] = useSearchParams({
		brand: '',
		price: '',
		product: '',
	});

	console.log(searchParams);

	const { data: productsQnty, error: productsQntyError } = useGetProductsQnty({
		brand: searchParams.get('brand'),
		product: searchParams.get('product'),
		price: searchParams.get('price'),
	});

	const {
		data: brands,
		isLoading: areBrandsLoading,
		error: brandError,
	} = useFetchBrands();

	const {
		data: products,
		isLoading: areProductsLoading,
		error: productsError,
	} = useFetchProducts(
		{
			brand: searchParams.get('brand'),
			product: searchParams.get('product'),
			price: searchParams.get('price'),
		},
		(currentPage - 1) * PRODUCTS_PER_PAGE,
		PRODUCTS_PER_PAGE,
	);

	if (brandError) {
		return <Error error={brandError} />;
	}

	if (productsError) {
		return <Error error={productsError} />;
	}

	if (productsQntyError) {
		return <Error error={productsQntyError} />;
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
				currentPage={currentPage}
				setCurrentPage={setCurrentPage}
				maxPages={getPagesQnty()}
			/>
		</main>
	);
}
