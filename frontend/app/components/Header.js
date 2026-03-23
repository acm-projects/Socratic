import {Plus} from "lucide-react";


export default function Header({title, showPlus, onPlusClick}) {
    return (
        <header className="w-full h-16 flex items-center gap-3 bg-white bg-cover bg-center px-32 py-5 "> 
        <h1 className="text-3xl font-bold text-[#728AB7] mt-1.5 tracking-tight">
          {title}
        </h1>


       
        </header>
        
    );
}  
        
