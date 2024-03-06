import { Card, CardHeader, CardContent, CardFooter } from './ui/card';
import { Skeleton } from './ui/skeleton';

export default function ProductsSkeleton() {
	return (
		<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4'>
			{Array(12)
				.fill(true)
				.map((_, index) => (
					<Card key={index} className='flex flex-col'>
						<CardHeader>
							<Skeleton className='h-8 rounded-md' />
							<Skeleton className='h-4 rounded-md' />
						</CardHeader>
						<CardContent>
							<Skeleton className='h-6 rounded-md' />
						</CardContent>
						<CardFooter className='justify-end mt-auto'>
							<Skeleton className='h-6 w-1/2 rounded-md' />
						</CardFooter>
					</Card>
				))}
		</div>
	);
}
