import {Plus} from "lucide-react";


export default function Header({title, showPlus}) {
    return (
        <header className="w-[1235px] h-[73px]  ml-[136px] mt-[20px] flex items-center gap-3 bg-[url('/bgACM.jpg')] bg-cover bg-center rounded-2xl px-8 py-5 shadow-sm"> 
        <h1 className="text-3xl font-bold text-[#728AB7] mt-1.5 tracking-tight">
          {title}
        </h1>


        {showPlus && (
        <button className="transition-transform duration-200 hover:scale-110">
        <div className="w-[30px] h-[30px] rounded-full bg-[#91A9D5] flex items-center justify-center">
          <Plus size={20} color="white" strokeWidth={2.5} />
        </div>
        </button>
        )}
        </header>
        
    );
}           
