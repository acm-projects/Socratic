import Navbar from "../components/Navbar";
import Header from "../components/Header";
import ChatUI from "../components/ChatUI";

 
export default function Home() {
    return (
        <main className="bg-[#F5F6FA] min-h-screen">
            <Navbar />
                <Header title="Discrete Math" showPlus={false} />
                 <div className="ml-[150px] pr-12 pt-6 pb-5 flex flex-col gap-6">

                <ChatUI/>
                </div>

                </main>

            
    );
}
