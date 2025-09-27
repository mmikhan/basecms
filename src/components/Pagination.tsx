import type { PaginatedDocs, TypedLocale } from 'payload'
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
import type { Route } from 'next'

type PaginationProps = PaginatedDocs & {
  className?: string
  locale: TypedLocale
}

export const PaginationComponent: React.FC<PaginationProps> = ({
  className,
  page = 1,
  totalPages,
  locale,
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
              href={
                (page - 1 === 1 ? `/${locale}/posts` : `/${locale}/posts/page/${page - 1}`) as Route
              }
            />
          </PaginationItem>

          {hasExtraPrevPages && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          {hasPrevPage && (
            <PaginationItem>
              <PaginationLink
                href={
                  (page - 1 === 1
                    ? `/${locale}/posts`
                    : `/${locale}/posts/page/${page - 1}`) as Route
                }
              >
                {page - 1}
              </PaginationLink>
            </PaginationItem>
          )}

          <PaginationItem>
            <PaginationLink
              aria-disabled={true}
              className="pointer-events-none text-muted-foreground"
              isActive
              href={(page === 1 ? `/${locale}/posts` : `/${locale}/posts/page/${page}`) as Route}
            >
              {page}
            </PaginationLink>
          </PaginationItem>

          {hasNextPage && (
            <PaginationItem>
              <PaginationLink href={`/${locale}/posts/page/${page + 1}` as Route}>
                {page + 1}
              </PaginationLink>
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
              href={`/${locale}/posts/page/${page + 1}` as Route}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}
