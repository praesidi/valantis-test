import github from '@/assets/github.svg';

export default function Footer() {
	return (
		<footer className='mt-auto p-2'>
			<div>
				<span className='inline-block align-middle'>design and code by</span>{' '}
				<a
					href='https://github.com/praesidi'
					target='_blank'
					className='text-gray-400 transition-all duration-300 ease-out hover:text-green-700'
				>
					<span className='inline-block align-middle'>praesidi</span>
					<img
						src={github}
						className='inline-block align-middle h-4 ml-1'
						alt='github logo'
					/>
				</a>
			</div>
		</footer>
	);
}
