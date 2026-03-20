import Navbar from "../components/Navbar"
import Header from "../components/Header"
import EngagementChart from "../components/EngagementChart"
import ExperienceChart from "../components/ExperienceChart"
import UserInfoCard from "../components/UserInfoCard"

export default function Page() {

  return (
    <main className="min-h-screen bg-[#F5F6FA] flex">
      <Navbar />
      <div className="flex flex-col flex-1 pl-32 pr-6 pt-8">
        <Header title="Profile" showPlus={false} />

        <div className="flex flex-col flex-1 mt-2 pb-8">

        <div className="flex flex-1 gap-10 mx-8 mt-8 pb-4">
          <UserInfoCard />

          {/* right section */}
          <div className="flex flex-col gap-6 flex-1 text-black font-semibold">
            <div className="bg-white rounded-2xl py-2 px-4">
              <ExperienceChart />
            </div>
            <div className="bg-white rounded-2xl p-2 text-black font-semibold flex-1">
              <EngagementChart />
            </div>
          </div>
        </div>
        </div>

      </div>
    </main>
  )
}

 