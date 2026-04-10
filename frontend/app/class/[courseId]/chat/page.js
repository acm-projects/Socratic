"use client"

import Header from "../../../components/Header";
import ChatUI from "../../../components/ChatUI"
import Link from "next/link"
import { useParams } from "next/navigation"





 
export default function Home() {
  const { courseId } = useParams()

    return (

    <main className={"relative min-h-screen overflow-hidden"}>
    <div
      className={`min-h-screen flex`}
      style={{
      backgroundImage: `
        linear-gradient(to bottom, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0) 90%),
        linear-gradient(135deg, rgba(234,244,242,0.7) 0%, rgba(245,248,247,0.7) 60%, rgba(247,245,251,0.7) 20%),
        url('/gridbackground.svg')
      `,        
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
        }}
    >


        <div className="relative pr-12 pt-6 pb-6 flex flex-col gap-2">
                    <div>
          <ChatUI classCode={courseId} topic={courseId} />
                    </div>
                </div>

                 </div>
                </main>

            
    );
}
