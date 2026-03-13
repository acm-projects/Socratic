import LandingCard from "./components/landingCard"

export default function Page() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#d9e5fd]">
      <LandingCard />
    </main>
  )
}

// import { getUserSession } from '../lib/session'

// export default async function Home() {
//   const user = await getUserSession()
//   return <main className="">{JSON.stringify(user)}</main>
// }
