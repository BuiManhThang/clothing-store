import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main>
      <Link href="/admin">Admin</Link>
      <Link href="/demo">Demo</Link>
    </main>
  )
}
