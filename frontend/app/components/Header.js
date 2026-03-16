import {Plus} from "lucide-react";


export default function Header({title, showPlus, onPlusClick}) {
    return (
        <header className="w-[1235px] h-[73px] flex items-center gap-3 bg-[url('/bgACM.jpg')] bg-cover bg-center rounded-xl px-8 py-5 "> 
        <h1 className="text-3xl font-bold text-[#728AB7] mt-1.5 tracking-tight">
          {title}
        </h1>


        {showPlus && (
        <button onClick={onPlusClick}
        className="transition-transform duration-200 hover:scale-110 cursor-pointer ">
        <div className="w-[30px] h-[30px] rounded-full bg-[#91A9D5] cursor pointer flex items-center justify-center hover:bg-[#7187b0]">
          <Plus size={20} color="white" strokeWidth={2.5} />
        </div>
        </button>
        )}
        </header>
        
    );
}           
