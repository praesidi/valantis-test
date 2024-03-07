import { Product } from '@/types';
import ProductCard from './ProductCard';
import NotFound from './NotFound';

function removeDuplicates(array: Product[]) {
	return array.filter(
		(value, index, self) => index === self.findIndex((t) => t.id === value.id),
	);
}

export default function Products({ data }: { data: Product[] | null }) {
	const filteredData = data && removeDuplicates(data);

	return (
		<>
			{data && data.length === 0 ? (
				<NotFound />
			) : (
				<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 mb-10'>
					{filteredData?.map((item) => (
						<ProductCard
							key={item.id}
							product={item.product}
							brand={item.brand}
							id={item.id}
							price={item.price}
						/>
					))}
				</div>
			)}
		</>
	);
}
