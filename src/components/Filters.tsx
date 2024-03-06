import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

export default function Filters({
	brandOptions,
	searchParams,
	setSearchParams,
}: {
	brandOptions: (string | null)[] | null;
	searchParams: URLSearchParams;
	setSearchParams: (args0: URLSearchParams) => void;
}) {
	function clearFilters() {
		searchParams.set('brand', '');
		searchParams.set('price', '');
		searchParams.set('product', '');
		setSearchParams(searchParams);
	}

	return (
		<div className='my-4'>
			<form className='flex gap-3 flex-wrap sm:flex-nowrap'>
				<Select
					value={searchParams.get('brand') || 'all'}
					onValueChange={(e) => {
						searchParams.set('brand', e);
						setSearchParams(searchParams);
					}}
					disabled={
						searchParams.get('price') || searchParams.get('product')
							? true
							: false
					}
				>
					<SelectTrigger>
						<SelectValue placeholder='Brands' />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value='all'>All brands</SelectItem>
						{brandOptions?.map(
							(brand, index) =>
								brand && (
									<SelectItem key={index} value={brand}>
										{brand}
									</SelectItem>
								),
						)}
					</SelectContent>
				</Select>
				<Input
					type='text'
					placeholder='Product name'
					value={searchParams.get('product') || ''}
					onChange={(e) => {
						searchParams.set('product', e.target.value);
						setSearchParams(searchParams);
					}}
					disabled={
						searchParams.get('price') ||
						searchParams.get('brand') === 'all' ||
						searchParams.get('brand')
							? true
							: false
					}
				></Input>
				<Input
					type='number'
					placeholder='Price'
					value={searchParams.get('price') || ''}
					onChange={(e) => {
						searchParams.set('price', e.target.value);
						setSearchParams(searchParams);
					}}
					disabled={
						searchParams.get('brand') ||
						searchParams.get('brand') === 'all' ||
						searchParams.get('product')
							? true
							: false
					}
				></Input>
				<Button
					className='min-w-[140px]'
					onClick={() => {
						clearFilters();
					}}
				>
					Clear
				</Button>
			</form>
		</div>
	);
}
