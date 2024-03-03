import { Card, CardHeader, CardContent, CardFooter } from './ui/card';
import { Skeleton } from './ui/skeleton';

export default function ProductCardSkeleton() {
	return (
		<Card className='flex flex-col'>
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
	);
}
