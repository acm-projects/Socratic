import Navbar from "../components/Navbar";
import Header from "../components/Header";
import ChatUI from "../components/ChatUI";
import { Plus_Jakarta_Sans } from 'next/font/google';
import bgShapes from '../../public/squarebg.png';


const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], weight: ['400','500','600','700','800'] })


 
export default function Home() {
    return (
        <main className={`relative bg-gradient-to-b from-[#EEF3F4] to-[#efefef] min-h-screen ${jakarta.className} overflow-hidden`}>

        <div className="relative pr-12 pt-6 pb-6 flex flex-col gap-2">
                    <div>
                    <ChatUI/>
                    </div>
                </div>

                </main>

            
    );
}
