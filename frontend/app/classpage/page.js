import Navbar from "../components/Navbar"
import Header from "../components/Header"

export default function Page() {
  return (
    <main className="min-h-screen bg-[#F5F6FA] flex">
      <Navbar />
      <div className="flex flex-col flex-1 pl-32 pr-6 pt-8">
        <Header title="Discrete Math" showPlus={false} />

        <div className="flex flex-col flex-1 mt-2 pb-8">
        <div className="bg-white rounded-2xl mt-8 mx-8 p-6 h-1/4 text-black">
            <p>Heat Map</p>
        </div>

        <div className="flex flex-1 gap-10 mx-8 mt-8">
          <div className="flex-1 bg-white rounded-2xl p-6 text-black ">
            <p>Topic Map</p>
          </div>
          <div className="flex flex-col gap-6 w-100">
            <div className="bg-white rounded-2xl p-6 text-black ">
              <p>Quick Tools</p>
            </div>
            <div className="bg-white rounded-2xl p-6 text-black ">
              <p>Upcoming Tasks</p>
            </div>
          </div>
        </div>
        </div>

      </div>
    </main>
  )
}

 