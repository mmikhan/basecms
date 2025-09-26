import { logout } from '@/actions/auth'
import { Button } from '@/components/ui/button'
import { redirect } from '@/i18n/navigation'
import { getUrl } from '@/lib/getURL'
import { LogoutBlock as LogoutBlockProps } from '@/payload-types'
import type { Route } from 'next'
import { getLocale } from 'next-intl/server'

export const LogoutBlock: React.FC<LogoutBlockProps> = ({ redirect: link }) => {
  return (
    <form
      action={async () => {
        'use server'

        try {
          await logout()
        } catch (error) {
          console.error('Logout failed:', error)
        } finally {
          redirect({
            href: getUrl(link) as Route,
            locale: await getLocale(),
          })
        }
      }}
    >
      <Button variant={link.appearance} type="submit">
        {link.label}
      </Button>
    </form>
  )
}
