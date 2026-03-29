import Navbar from "../components/Navbar";
import Header from "../components/Header";
import ChatUI from "../components/ChatUI";

 
export default function Home() {
    return (
        <main className="bg-[#F5F6FA] min-h-screen">
            <Navbar />
                 <div className="ml-[150px] pr-12 pt-8 pb-5 flex flex-col flex-1 gap-6">
                  <h2 className="text-3xl font-bold text-black">Discrete Math</h2>

                    <div>
                    <ChatUI/>
                    </div>
                </div>

                </main>

            
    );
}
