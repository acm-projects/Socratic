

export default function Heatmap({ data = [] }) {

   

    {/* function that returns a color based on score  */}
    const getColor = (score) => {
        if (score == 0) return "bg-[#ECEDF0]"
        if (score == 1) return "bg-[#B2DFDB]"
        if (score == 2) return "bg-[#4DB5AC]"
        if (score == 3) return "bg-[#03897B]"
        if (score == 4) return "bg-[#004D42]"
        if (score == 5) return "bg-[#ECEDF0]"

    }

    return (
        <div className = "flex flex-col gap-2">
        {/*first row of map*/}
        <div className = "flex gap-2">
        {data.slice(0, 5).map((score, i) => (
        <div key={i} className={`w-[25px] h-[25px] ${getColor(score)} rounded-xs`}/>
        ))}
        </div>
        
        {/*second row of map*/}
        <div className = "flex gap-2">
        {data.slice(5, 10).map((score, i) => (
        <div key={i} className = {`w-[25px] h-[25px] ${getColor(score)} rounded-xs`}/>
        ))}
        </div>
        </div>
   
    );
}