"use client"
import { useState, useEffect } from "react"
import { Check } from "lucide-react"
import { useSession } from "next-auth/react";


const courseColors = {
  "Discrete Math":      "#3a9e94",
  "Physics I":          "#9C52E3",
  "Calculus II":        "#4E78FF",
  "Computer Science I": "#1D9E75",
  "Linear Algebra":     "#6B21C8",
  "Chemistry I":        "#15B7E6",
}

export default function UpcomingTasks({ tasks: propTasks }) {
    const { data: session } = useSession();
  const userId = session?.user?.id;

  const [completed, setCompleted] = useState([])


const [tasks, setTasks] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
      if (!userId) return;

  const fetchUpcomingTasks = async () => {
    try {
      const res = await fetch(
        `http://3.128.186.118:5000/api/users/${userId}/upcoming-tasks`
      );
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      console.error("Failed to fetch tasks:", err);
    } finally {
      setLoading(false);
    }
  };

  fetchUpcomingTasks();
}, [userId]);







//   useEffect(() => {
//     if (propTasks) return

//     async function fetchAllTasks() {
//       if (!session?.user?.id) return; // Ensure we have a user to filter by
//       try {
//         const classes = await fetch("http://3.128.186.118:5000/api/classes")
//           .then(r => r.json())

//         const taskArrays = await Promise.all(
//           classes.map(cls =>
//             fetch(`http://3.128.186.118:5000/api/syllabus/tasks/${cls.class_code}`)
//               .then(r => r.json())
//               .then(data => Array.isArray(data) ? data.map(t => ({
//                 title: t.task_name,
//                 course: cls.name || cls.class_code,
//                 courseCode: cls.class_code,              // ← added
//                 due: new Date(t.due_date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
//                 dueRaw: new Date(t.due_date),
//               })) : [])
//               .catch(() => [])
//           )
//         )

//         const now = new Date()
//         const in7days = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)

//         const all = taskArrays.flat().sort((a, b) => a.dueRaw - b.dueRaw)

//         // ADD THESE
// console.log("now:", now)
// console.log("in7days:", in7days)
// console.log("sample dueRaw:", all[0]?.dueRaw)
// console.log("all tasks:", all.map(t => ({ title: t.title, dueRaw: t.dueRaw })))

//         const seen = new Set()
//         const deduped = all.filter(t => {
//           const k = `${t.courseCode}-${t.title}`
//           if (seen.has(k)) return false
//           seen.add(k)
//           return true
//         })

//         setTasks(deduped.filter(t => t.dueRaw >= now && t.dueRaw <= in7days))

//       } catch (err) {
//         console.error("Failed to fetch tasks:", err)
//       }
//     }

//     fetchAllTasks()
//   }, [propTasks])

  const toggle = (id) => {
    setCompleted(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    )
  }

  return (
    <div className="flex flex-col flex-1 min-h-0">
      <h2 className="text-base font-semibold text-[#141f1d] mb-3 shrink-0">Upcoming Tasks</h2>
      <div className="overflow-y-auto scrollbar-hide flex flex-col">
        {tasks.length === 0 && (
          <p className="text-sm text-[#90aba7]">No tasks due in the next 7 days.</p>
        )}
        {tasks.map((task, i, arr) => {
          const done = completed.includes(task.id)
          return (
            <div key={`${task.courseCode}-${task.title}-${i}`} className={`flex items-center gap-4 py-4 ${i !== arr.length - 1 ? "border-b border-[#EAEEED]" : ""}`}>  {/* ← fixed key */}

              <div className={`flex items-center gap-4 flex-1 transition-opacity ${done ? "opacity-40" : "opacity-100"}`}>
                <div className="w-28 pr-6 flex-shrink-0">
                  <p className="text-sm text-[#90aba7] pb-1">Due</p>
                  <p className="text-sm font-bold text-[#141f1d]">{task.due}</p>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold pb-1 text-[#141f1d]">{task.title}</p>
                  <p className="text-xs text-[#90aba7] mt-0.5">{task.course}</p>
                </div>
              </div>

              <button
                onClick={() => toggle(task.title)}
                className={`w-5 h-5 rounded-full border-1 flex items-center justify-center shrink-0 transition-all ${
                  done ? "bg-[#3a9e94] border-[#3a9e94]" : "border-[#c4c7c7] hover:border-[#3a9e94]"
                }`}
              >
                {done && <Check size={12} className="text-white" strokeWidth={3} />}
              </button>

            </div>
          )
        })}
      </div>
    </div>
  )
}