import Navbar from "../components/Navbar"
import Header from "../components/Header"

export default function Page() {
  return (
    <main className="min-h-screen bg-[#F5F6FA] flex">
      <Navbar />
      <div className="flex flex-col flex-1 pl-32 pr-6 pt-8">
        <Header title="Profile" showPlus={false} />

        <div className="flex flex-col flex-1 mt-2 pb-8">

        <div className="flex flex-1 gap-10 mx-8 mt-8">
          <div className="flex-1 bg-white rounded-2xl p-6 text-black font-semibold">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-gray-300" />
                    <div>
                    <p className="font-normal text-gray-900 text-lg">Student Name</p>
                    <p className="text-gray-400 text-sm font-normal">studentemail@gmail.com</p>
                    </div>
                </div>
                <button className="bg-[#3D5C9B] text-white px-5 py-2 rounded-lg text-sm font-medium">
                    Edit
                </button>
            </div>
          </div>
          <div className="flex flex-col gap-6 w-1/2 text-black font-semibold">
            <div className="bg-white rounded-2xl p-6">
              <p>Experienced earned</p>
            </div>
            <div className="bg-white rounded-2xl p-6 text-black font-semibold">
              <p>Engagement</p>
            </div>
          </div>
        </div>
        </div>

      </div>
    </main>
  )
}

 