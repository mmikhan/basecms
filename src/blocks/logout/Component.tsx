import { logout } from '@/actions/auth'
import { Button } from '@/components/ui/button'
import { LogoutBlock as LogoutBlockProps } from '@/payload-types'
import type { Route } from 'next'
import { redirect } from 'next/navigation'

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
          redirect((link?.url as Route) ?? '/')
        }
      }}
    >
      <Button variant={link.appearance} type="submit">
        {link.label}
      </Button>
    </form>
  )
}
