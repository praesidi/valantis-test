export default function Error({ error }: { error: string }) {
	return (
		<div className='py-3 px-2'>
			<p>Something went wrong :(</p>
			<br />
			{error}
			<br />
			<p>Try to reload the page</p>
		</div>
	);
}
