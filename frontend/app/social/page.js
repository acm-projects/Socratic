import Navbar from "../components/Navbar";
import Header from "../components/Header";


export default function Home() {
    return(

        <main className="px-5 pt-6 bg-[#f0f2f8] min-h-screen"> 
            {/* HEADER */}
            <Header title="Social" showPlus={false} />
            <Navbar/>

            <div className = "flex flex-row" >
                <div className = "bg-white shadow-md w-[649px] h-[762px] rounded-2xl p-5 mt-5 ml-[136px]">
                    <h2 className = "text-xl font-semibold text-black">
                        Friends
                    </h2>
                    </div>




            </div>











        </main>
    )
}