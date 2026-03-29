import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Leaderboard from "../components/socialcomponents/Leaderboard";
import Studysessions from "../components/socialcomponents/Studysessions";
import Requests from "../components/socialcomponents/Requests";
import RightPanel from "../components/socialcomponents/RightPanel";

export default function Home() {
    return (
        <main className="bg-[#F5F6FA] min-h-screen">
            <Navbar />
                
                <div className="ml-[120px] pr-6 pt-8 pb-3 flex flex-col gap-6">

              <h2 className="text-3xl font-bold text-black">Social</h2>


                <div className="flex flex-row gap-9 items-start pt-4">
                    <Leaderboard />
                    <div className="flex flex-col gap-4 ">
                        <Studysessions />
                        <Requests />
                    </div>
                    <RightPanel/>
                </div>
            </div>
        </main>
    );
}