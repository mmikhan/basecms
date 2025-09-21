import Link from 'next/link'

export default async function DashboardPage() {
  return (
    <>
      <h1>Dashboard</h1>
      <p>Welcome to your dashboard!</p>

      <Link href="/dashboard/account">Go to Account Settings</Link>
    </>
  )
}
