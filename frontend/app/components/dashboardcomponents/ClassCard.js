import {EllipsisVertical} from "lucide-react";
import Heatmap from "./Heatmap";
import { HiFire } from "react-icons/hi";



export default function ClassCard({ name }) {
   {/*array of dummy data*/}
    const heatmapData = {
        "Computer Science I" : [1,0,3,5,2,0,2,4,5,5],
        "Discrete Math" : [4,0,3,4,2,3,1,0,2,1],
        "Physics I" : [2,1,3,2,2,0,1,4,5,5],
        "Calculus II" : [5,5,3,2,4,0,2,4,1,2],

    }
  return (
    <div className=" relative w-185 h-37.5 bg-white rounded-xl p-5 transition-transform duration-200 hover:scale-102 cursor-pointer">
      
      <div className = "flex flex-col gap-10"> 
      <h2 className="mt-1 ml-4 text-2xl font-semibold text-black">
        {name}
      </h2>

      {/*STREAK*/}
      <div className = "flex items-end gap-2.5">
      <HiFire className = "text-gray-300 ml-4 mt-2" size={30}/>
      <p className="text-xl font-semibold text-gray-300"> 5 days</p>
      </div>
      </div>

    

      {/*HEATMAP*/}
        <div className="absolute top-15 left-100">
          <Heatmap data={heatmapData[name]} />
        </div>

      {/*FOR THE 3 DOTS AND THE PAST 10 DAYS*/}
        <p className="absolute top-5 left-100 font-semibold text-xl text-gray-300">Past 10 days</p>

        <EllipsisVertical className="text-gray-300 absolute top-5 right-5" size = {18} />


    </div>
    
  );
}