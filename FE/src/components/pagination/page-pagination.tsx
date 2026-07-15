"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

import { getPageItems } from "./get-page-items";

export interface PagePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isDisabled?: boolean;
  className?: string;
}

export function PagePagination({
  currentPage,
  totalPages,
  onPageChange,
  isDisabled = false,
  className,
}: PagePaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const canPreviousPage = currentPage > 1;
  const canNextPage = currentPage < totalPages;
  const pageItems = getPageItems(currentPage, totalPages);

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage || isDisabled) {
      return;
    }

    onPageChange(page);
  };

  return (
    <Pagination className={className}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            aria-disabled={!canPreviousPage || isDisabled}
            className={cn(
              (!canPreviousPage || isDisabled) &&
                "pointer-events-none opacity-50"
            )}
            onClick={(event) => {
              event.preventDefault();
              goToPage(currentPage - 1);
            }}
          />
        </PaginationItem>

        {pageItems.map((item, index) =>
          item === "ellipsis" ? (
            <PaginationItem key={`ellipsis-${index}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={item}>
              <PaginationLink
                href="#"
                isActive={item === currentPage}
                aria-disabled={isDisabled}
                className={cn(isDisabled && "pointer-events-none opacity-50")}
                onClick={(event) => {
                  event.preventDefault();
                  goToPage(item);
                }}
              >
                {item}
              </PaginationLink>
            </PaginationItem>
          )
        )}

        <PaginationItem>
          <PaginationNext
            href="#"
            aria-disabled={!canNextPage || isDisabled}
            className={cn(
              (!canNextPage || isDisabled) && "pointer-events-none opacity-50"
            )}
            onClick={(event) => {
              event.preventDefault();
              goToPage(currentPage + 1);
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
