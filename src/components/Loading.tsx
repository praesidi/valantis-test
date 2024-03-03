import ProductCardSkeleton from './ProductCardSkeleton';

export default function Loading() {
	return (
		<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4'>
			{Array(12)
				.fill(true)
				.map((_, index) => (
					<ProductCardSkeleton key={index} />
				))}
		</div>
	);
}
