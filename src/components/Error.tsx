import { Button } from '@/components/ui/button';

export default function Error({
	error,
	onClick,
}: {
	error: string;
	onClick: () => void;
}) {
	return (
		<div className='py-3 px-2'>
			Something went wrong :(
			<br />
			{error}
			<br />
			<Button onClick={onClick} className='mt-5'>
				Try Again
			</Button>
		</div>
	);
}
