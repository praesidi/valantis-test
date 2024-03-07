import { useEffect, useState } from 'react';
import {
	PaginationContent,
	PaginationItem,
	PaginationPrevious,
	PaginationLink,
	PaginationEllipsis,
	PaginationNext,
	Pagination as PaginationWrapper,
} from './ui/pagination';

export default function Pagination({
	maxPages,
	searchParams,
	setSearchParams,
}: {
	maxPages: number;
	searchParams: URLSearchParams;
	setSearchParams: (args0: URLSearchParams) => void;
}) {
	const [buttonsArray, setButtonsArray] = useState<(number | 'dots')[]>([]);
	const btnsQnty = 7;
	const currentPage =
		Number(searchParams.get('offset')) / Number(searchParams.get('limit')) + 1;
	const currentOffset = Number(searchParams.get('offset'));
	const currentLimit = Number(searchParams.get('limit'));

	useEffect(() => {
		if (maxPages <= btnsQnty) {
			const array = [];

			for (let i = 0; i < maxPages; i++) {
				array.push(i + 1);
			}

			setButtonsArray(array);
		} else {
			const buttonsArray = Array(btnsQnty - 2); // from second to penultimate
			const dynamicBtnsQnty = btnsQnty - 2; // number of buttons exl first and last btns

			if (
				currentPage >= dynamicBtnsQnty &&
				currentPage <= maxPages - dynamicBtnsQnty + 1
			) {
				const min = currentPage - 1;
				// buttons when dots shown on both sides
				for (let i = 0; i < dynamicBtnsQnty; i++) {
					if (i === 0 || i === buttonsArray.length - 1) {
						buttonsArray[i] = 'dots';
					} else {
						buttonsArray[i] = min + i - 1;
					}
				}
			} else if (currentPage >= dynamicBtnsQnty) {
				// buttons when dots shown on the left side
				for (let i = 0; i < dynamicBtnsQnty; i++) {
					if (i === 0) {
						buttonsArray[i] = 'dots';
					} else {
						buttonsArray[i] = maxPages - dynamicBtnsQnty + i;
					}
				}
			} else {
				// buttons when dots shown on the right side
				for (let i = 0; i < dynamicBtnsQnty; i++) {
					if (i === buttonsArray.length - 1) {
						buttonsArray[i] = 'dots';
					} else {
						buttonsArray[i] = i + 2;
					}
				}
			}

			const result = [1, ...buttonsArray, maxPages];
			setButtonsArray(result);
		}
	}, [searchParams, maxPages, currentPage]);

	function onPrevious() {
		if (currentPage === 1) return;

		const updatedOffset = String(currentOffset - currentLimit);
		searchParams.set('offset', updatedOffset);
		setSearchParams(searchParams);
	}

	function onNext() {
		if (currentPage === maxPages) return;

		const updatedOffset = String(currentOffset + currentLimit);
		searchParams.set('offset', updatedOffset);
		setSearchParams(searchParams);
	}

	function onStep(page: number) {
		const updatedOffset = String((page - 1) * currentLimit);
		searchParams.set('offset', updatedOffset);
		setSearchParams(searchParams);
	}

	return (
		<>
			<PaginationWrapper className='mt-auto'>
				<PaginationContent>
					<PaginationItem>
						<PaginationPrevious
							className={
								currentPage === 1 ? 'pointer-events-none opacity-50' : undefined
							}
							onClick={() => onPrevious()}
							href='#'
						/>
					</PaginationItem>
					{buttonsArray.map((page, index) => {
						const active = page === currentPage ? true : false;
						return (
							<PaginationItem key={index}>
								{page === 'dots' ? (
									<PaginationEllipsis></PaginationEllipsis>
								) : (
									<PaginationLink
										onClick={() => onStep(page)}
										href='#'
										isActive={active}
									>
										{page}
									</PaginationLink>
								)}
							</PaginationItem>
						);
					})}
					<PaginationItem>
						<PaginationNext
							className={
								currentPage === maxPages || maxPages === 0
									? 'pointer-events-none opacity-50'
									: undefined
							}
							onClick={() => onNext()}
							href='#'
						/>
					</PaginationItem>
				</PaginationContent>
			</PaginationWrapper>
		</>
	);
}
