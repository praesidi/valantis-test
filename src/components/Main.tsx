import Pagination from './Pagination';

export default function Main() {
	return (
		<main className='flex flex-col p-2 flex-1'>
			<Pagination currentPage={1} maxPages={5} />
		</main>
	);
}
