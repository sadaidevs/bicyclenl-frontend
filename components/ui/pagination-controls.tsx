import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

type PaginationControlsProps = {
  currentPage: number
  totalItems: number
  itemsPerPage: number
  onPageSelect: (page: number) => void
  onPrevious: () => void
  onNext: () => void
  className?: string
}

export default function PaginationControls({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageSelect,
  onPrevious,
  onNext,
  className,
}: PaginationControlsProps) {
  const safeItemsPerPage = Math.max(1, itemsPerPage)
  const totalPages = Math.max(1, Math.ceil(totalItems / safeItemsPerPage))
  const hasMultiplePages = totalPages > 1
  const isPreviousDisabled = !hasMultiplePages || currentPage <= 1
  const isNextDisabled = !hasMultiplePages || currentPage >= totalPages

  return (
    <Pagination className={`mt-4 ${className || ""}`}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            aria-disabled={isPreviousDisabled}
            className={isPreviousDisabled ? "pointer-events-none opacity-50" : ""}
            onClick={(event) => {
              event.preventDefault()
              if (isPreviousDisabled) return
              onPrevious()
            }}
          />
        </PaginationItem>
        {Array.from({ length: totalPages }, (_, index) => {
          const pageNumber = index + 1
          const isActive = pageNumber === currentPage

          return (
            <PaginationItem key={pageNumber}>
              <PaginationLink
                href="#"
                isActive={isActive}
                aria-disabled={isActive}
                className={isActive ? "pointer-events-none" : ""}
                onClick={(event) => {
                  event.preventDefault()
                  if (isActive) return
                  onPageSelect(pageNumber)
                }}
              >
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          )
        })}
        <PaginationItem>
          <PaginationNext
            href="#"
            aria-disabled={isNextDisabled}
            className={isNextDisabled ? "pointer-events-none opacity-50" : ""}
            onClick={(event) => {
              event.preventDefault()
              if (isNextDisabled) return
              onNext()
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
