import { Skeleton } from './ui/skeleton';

export default function FiltersSkeleton() {
	return (
		<div className='my-4 flex gap-3 flex-wrap sm:flex-nowrap'>
			<Skeleton className='h-10 flex-1 rounded-md' />
			<Skeleton className='h-10 flex-1 rounded-md' />
			<Skeleton className='h-10 flex-1 rounded-md' />
			<Skeleton className='h-10 min-w-[140px] rounded-md' />
		</div>
	);
}
