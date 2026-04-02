import Navbar from "../components/Navbar";
import Header from "../components/Header";
import ChatUI from "../components/ChatUI";

 
export default function Home() {
    return (
        <main className="bg-[#F5F5F5] min-h-screen">
                 <div className="ml-10 pr-12 pt-6 pb-6 flex flex-col gap-2">
                                  <h2 className="text-2xl font-bold text-black">Discrete Math</h2>

                    <div>
                    <ChatUI/>
                    </div>
                </div>

                </main>

            
    );
}
