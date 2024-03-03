/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
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
	currentPage,
}: {
	maxPages: number;
	currentPage: number;
}) {
	const [activePage, setActivePage] = useState(1);

	const pagesArr = [];

	for (let i = 1; i <= maxPages; i++) {
		pagesArr.push(i);
	}

	function onPrevious() {
		if (activePage === 1) return;
		setActivePage(activePage - 1);
	}

	function onNext() {
		if (activePage === maxPages) return;
		setActivePage(activePage + 1);
	}

	return (
		<>
			<PaginationWrapper className='mt-auto'>
				<PaginationContent>
					<PaginationItem>
						<PaginationPrevious
							className={
								activePage === 1 ? 'pointer-events-none opacity-50' : undefined
							}
							onClick={() => {
								onPrevious();
							}}
							href='#'
						/>
					</PaginationItem>
					{pagesArr.map((page) => {
						const active = page === activePage ? true : false;
						return (
							<PaginationItem key={page}>
								<PaginationLink
									onClick={() => {
										setActivePage(page);
									}}
									href='#'
									isActive={active}
								>
									{page}
								</PaginationLink>
							</PaginationItem>
						);
					})}
					<PaginationItem>
						<PaginationNext
							className={
								activePage === maxPages
									? 'pointer-events-none opacity-50'
									: undefined
							}
							onClick={() => {
								onNext();
							}}
							href='#'
						/>
					</PaginationItem>
				</PaginationContent>
			</PaginationWrapper>
		</>
	);
}
