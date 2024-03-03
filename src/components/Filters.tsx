/* eslint-disable @typescript-eslint/no-unused-vars */
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
	onSearch,
	onClear,
}: {
	brandOptions: (string | null)[] | null;
	onSearch: () => void;
	onClear: () => void;
}) {
	return (
		<div className='my-4'>
			<form className='flex gap-3 flex-wrap sm:flex-nowrap'>
				<Select defaultValue='all'>
					<SelectTrigger>
						<SelectValue placeholder='Brand' />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value='all'>All brands</SelectItem>
						{brandOptions?.map((brand, index) => {
							return brand ? (
								<SelectItem key={index} value={brand.toLowerCase()}>
									{brand}
								</SelectItem>
							) : (
								<SelectItem key={index} value={'brandless'}>
									{'Without brand'}
								</SelectItem>
							);
						})}
					</SelectContent>
				</Select>
				<Input type='text' placeholder='Product name'></Input>
				<Input type='number' placeholder='Price'></Input>
				<Button type='submit' className='min-w-[140px]'>
					Filter
				</Button>
				<Button className='min-w-[140px]'>Clear</Button>
			</form>
		</div>
	);
}
