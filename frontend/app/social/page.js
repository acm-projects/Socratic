import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Leaderboard from "../components/socialcomponents/Leaderboard";
import Studysessions from "../components/socialcomponents/Studysessions";
import Requests from "../components/socialcomponents/Requests";


export default function Home() {
    return (
        <main className="bg-[#F5F6FA] min-h-screen">
            <Navbar />
            <div className="ml-[150px] pr-12 pt-6 pb-5 flex flex-col gap-6">
                <Header title="Social" showPlus={false} />
                <div className="flex flex-row gap-9">
                    <Leaderboard />
                    <div className="flex flex-col gap-4 ">
                        <Studysessions />
                        <Requests />
                    </div>
                </div>
            </div>
        </main>
    );
}