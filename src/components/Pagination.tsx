import type { PaginatedDocs } from 'payload'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { cn } from '@/lib/utils'

export const PaginationComponent: React.FC<PaginatedDocs & { className?: string }> = ({
  className,
  page = 1,
  totalPages,
}) => {
  const hasNextPage = page < totalPages
  const hasPrevPage = page > 1

  const hasExtraPrevPages = page - 1 > 1
  const hasExtraNextPages = page + 1 < totalPages

  return (
    <div className={cn('my-12', className)}>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              aria-disabled={!hasPrevPage}
              className={cn({
                'pointer-events-none text-muted-foreground': !hasPrevPage,
              })}
              href={`/posts/page/${page - 1}`}
            />
          </PaginationItem>

          {hasExtraPrevPages && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          {hasPrevPage && (
            <PaginationItem>
              <PaginationLink href={`/posts/page/${page - 1}`}>{page - 1}</PaginationLink>
            </PaginationItem>
          )}

          <PaginationItem>
            <PaginationLink
              aria-disabled={true}
              className="pointer-events-none text-muted-foreground"
              isActive
              href={`/posts/page/${page}`}
            >
              {page}
            </PaginationLink>
          </PaginationItem>

          {hasNextPage && (
            <PaginationItem>
              <PaginationLink href={`/posts/page/${page + 1}`}>{page + 1}</PaginationLink>
            </PaginationItem>
          )}

          {hasExtraNextPages && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          <PaginationItem>
            <PaginationNext
              aria-disabled={!hasNextPage}
              className={cn({
                'pointer-events-none text-muted-foreground': !hasNextPage,
              })}
              href={`/posts/page/${page + 1}`}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}
