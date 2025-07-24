import { cn } from '@/lib/utils'

export const Icon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <div className="relative">
      <svg
        {...props}
        viewBox="0 0 24 24"
        fill="none"
        className={cn('text-gray-800 dark:text-gray-200 size-10', props.className)}
      >
        <path
          d="M19 7h-3V6a4 4 0 0 0-8 0v1H5a1 1 0 0 0-1 1v11a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8a1 1 0 0 0-1-1zM10 6a2 2 0 0 1 4 0v1h-4V6zm8 15a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V9h2v1a1 1 0 0 0 2 0V9h4v1a1 1 0 0 0 2 0V9h2v12z"
          fill="currentColor"
        />
      </svg>

      <div className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-gradient-to-br from-pink-400 via-orange-400 to-violet-400 rounded-full border-2 border-white dark:border-gray-800" />
    </div>
  )
}
