export interface Product {
	brand: string | null;
	id: string;
	price: number;
	product: string;
}

export type Brands = (string | null)[];

export interface Filter {
	brand: string | null;
	price: string | number | null;
	product: string | null;
}
