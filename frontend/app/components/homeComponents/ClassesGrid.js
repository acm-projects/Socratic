import Link from "next/link"

const courseColors = {
  "Discrete Math":      "#3a9e94",
  "Physics I":          "#9C52E3",
  "Calculus II":        "#4E78FF",
  "Computer Science I": "#1D9E75",
  "Linear Algebra":     "#6B21C8",
  "Chemistry I":        "#15B7E6",
}

export default function ClassesGrid({ courses }) {
  return (
    <div className="grid grid-cols-3 gap-3 flex-1 h-100">
      {courses.map((c) => (
        <Link href={`/class/${c.code}`} key={c.code} className="bg-white/65 backdrop-blur-sm rounded-2xl p-4 flex flex-col gap-1 cursor-pointer hover:bg-white transition-all border border-white/60">
            <p className="text-sm font-semibold text-[#141f1d] leading-snug">{c.name}</p>
            <p className="text-[10px] font-semibold text-[#90aba7] uppercase tracking-widest">{c.code}</p>
        </Link>
      ))}
    </div>
  )
}