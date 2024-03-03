import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Product } from '@/types';

export default function ProductCard({ product, id, price, brand }: Product) {
	return (
		<>
			<Card className='flex flex-col'>
				<CardHeader>
					<CardTitle>{product}</CardTitle>
					<CardDescription>ID: {id}</CardDescription>
				</CardHeader>
				<CardContent>
					<p>{brand ? brand : 'unknown brand'}</p>
				</CardContent>
				<CardFooter className='justify-end mt-auto'>
					<p className='text-lg font-semibold'>{price}₽</p>
				</CardFooter>
			</Card>
		</>
	);
}
