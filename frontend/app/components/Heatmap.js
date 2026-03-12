

export default function Heatmap({ data = [] }) {

   

    {/* function that returns a color based on score  */}
    const getColor = (score) => {
        if (score == 0) return "bg-[#F0F2F5]"
        if (score == 1) return "bg-[#D6E1FD]"
        if (score == 2) return "bg-[#CDD5FF]"
        if (score == 3) return "bg-[#96C2FF]"
        if (score == 4) return "bg-[#667CA3]"
        if (score == 5) return "bg-[#7A8FBE]"

    }

    return (
        <div className = "flex flex-col gap-2">
        {/*first row of map*/}
        <div className = "flex gap-2">
        {data.slice(0, 5).map((score, i) => (
        <div key={i} className={`w-[30px] h-[30px] ${getColor(score)} rounded-md`}/>
        ))}
        </div>
        
        {/*second row of map*/}
        <div className = "flex gap-2">
        {data.slice(5, 10).map((score, i) => (
        <div key={i} className = {`w-[30px] h-[30px] ${getColor(score)} rounded-md`}/>
        ))}
        </div>
        </div>
   
    );
}