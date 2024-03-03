import illustration from '@/assets/empty_state.png';

export default function NotFound() {
	return (
		<div className='m-4 p-4'>
			<p className='text-xl font-medium'>Nothing found</p>
			<img src={illustration} alt='nothing found' width={400} />
		</div>
	);
}
