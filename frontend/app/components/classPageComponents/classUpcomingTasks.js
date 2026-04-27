"use client"
import { useState, useEffect } from "react"  
import { Check, Plus, CircleAlert } from "lucide-react"
import { useSession } from "next-auth/react"
import AddTaskModal from "./addTaskModal"

export default function UpcomingTasks({ tasks, onToggle, classInfo }) {
    const { data: session } = useSession();
    const [showAddTask, setShowAddTask] = useState(false)
    const [localTasks, setLocalTasks] = useState(tasks)

    useEffect(() => {
      setLocalTasks(tasks)
    }, [tasks])

    const isExam = (name) => {
      const keywords = ["exam", "final", "midterm", "test", "quiz"]
      return keywords.some(k => new RegExp(`\\b${k}\\b`, "i").test(name))
    }

    const toggle = async (task) => {
      const newCompleted = !task.completed
      
      onToggle?.(task.id, newCompleted)

      try {
        if (!session?.user?.id) {
          console.error('No user session');
          return;
        }
        if (!task?.id) {
          console.error('No task ID');
          return;
        }

        const res = await fetch(`/backend/api/users/${task.user_id}/tasks/${task.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ completed: newCompleted })
        })
        
        if (!res.ok) {
          onToggle?.(task.id, !newCompleted)
          console.error("Failed to update task")
        }
      } catch (err) {
        console.error("Failed to update task:", err)
        onToggle?.(task.id, !newCompleted)
      }
    }

// const handleAddTask = async (newTask) => {
//   try {
//     if (!session?.user?.id) {
//       console.error('No user session');
//       return;
//     }

//     // Format the date for display 
//     const formattedDate = new Date(newTask.due + "T00:00:00").toLocaleDateString("en-US", { 
//       month: "short", 
//       day: "numeric" 
//     });

//     const res = await fetch(`/backend/api/users/${session.user.id}/tasks`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         class_code: classInfo.class_code, // Changed from classInfo.code to classInfo.class_code
//         task_name: newTask.title,
//         due_date: newTask.due 
//       })
//     });

//     if (!res.ok) {
//       console.error("Failed to create task");
//       return;
//     }

//     const createdTask = await res.json();
    
//     // Add formatted task to local state
//     setLocalTasks(prev => [...prev, {
//       ...createdTask,
//       due: formattedDate // Use formatted date for display
//     }]);
    
//   } catch (err) {
//     console.error("Failed to add task:", err);
//   }
// }

const handleAddTask = async (newTask) => {
  try {
    if (!session?.user?.id) { console.error('No user session'); return; }

    const formattedDate = new Date(newTask.due + "T00:00:00").toLocaleDateString("en-US", { 
      month: "short", day: "numeric" 
    });

    const res = await fetch(`/backend/api/users/${session.user.id}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        class_code: classInfo.class_code,
        task_name: newTask.title,
        due_date: newTask.due 
      })
    });

    if (!res.ok) { console.error("Failed to create task"); return; }

    const createdTask = await res.json();
    console.log("createdTask:", createdTask)

    setLocalTasks(prev => [...prev, { ...createdTask, due: formattedDate }]);

    try {
      const dueDate = new Date(newTask.due)
      dueDate.setHours(23, 59, 0, 0)
      console.log("posting to calendar now")
      const calRes = await fetch("/backend/api/calendar/create-event", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${session?.accessToken}`,
          "x-user-id": session?.user?.id
        },
        body: JSON.stringify({
          summary: newTask.title,
          description: `${classInfo.name} Deadline`,
          startDateTime: dueDate.toISOString(),
          endDateTime: dueDate.toISOString(),
          createMeet: false,
          attendeeEmails: [],
          userId: session?.user?.id
        })
      });
      console.log("calendar response:", calRes.status)
    } catch (calErr) {
      console.error("calendar error:", calErr)
    }

  } catch (err) {
    console.error("Failed to add task:", err);
  }
}




    const syncAllTasksToCalendar = async () => {
      for (const task of localTasks) {
        if (task.completed) continue;
        
        const currentYear = new Date().getFullYear();
        const dueDate = new Date(`${task.due} ${currentYear}`);
        dueDate.setHours(23, 59, 0, 0);
        
        const endDate = new Date(dueDate);
        endDate.setHours(23, 59, 0, 0);
        
        const event = {
          summary: task.title,       
          description: `${classInfo.name} Deadline`,
          startDateTime: dueDate.toISOString(),
          endDateTime: endDate.toISOString(),
          createMeet: false,             
          attendeeEmails: []                
        };
        
        const res = await fetch("/backend/api/calendar/create-event", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.accessToken}`,
            "x-user-id": session?.user?.id
          },
          body: JSON.stringify({ ...event, userId: session?.user?.id })
        });
        console.log(res.status, await res.json());
      }
      
      alert("Tasks synced to Google Calendar");
    };

    return (
      <div className="flex flex-col flex-1 min-h-0">
        <div className="flex items-center justify-between mb-3 shrink-0 group">
          <h2 className="text-base font-semibold text-[#141f1d]">Upcoming Tasks</h2>
          <button 
            onClick={() => setShowAddTask(true)} 
            className="w-6 h-6 rounded-full bg-white/80 flex items-center justify-center hover:bg-gray-100 transition-colors opacity-0 group-hover:opacity-100">
            <Plus size={15} className="text-gray-400"  strokeWidth={3}/>
          </button>
        </div>

        <div className="overflow-y-auto scrollbar-hide flex flex-col">
          {localTasks.map((task, i, arr) => {
            const done = task.completed
            const key = task.id || `${task.title}-${i}`
            return (
              <div key={key} className={`flex items-center gap-4 py-4 ${i !== arr.length - 1 ? "border-b border-[#EAEEED]" : ""}`}>
                <div className="w-4 shrink-0 flex items-center justify-center">
                  {isExam(task.title) && (
                    <CircleAlert size={18} className="text-red-600" strokeWidth={2.5} />
                  )}
                </div>
                <div className={`flex items-center gap-4 flex-1 transition-opacity ${done ? "opacity-40" : "opacity-100"}`}>
                  <div className="w-28 pr-6 flex-shrink-0">
                    <p className="text-xs text-[#90aba7] pb-1">Due</p>
                    <p className="text-sm font-bold text-[#141f1d]">{task.due}</p>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold pb-1 text-[#141f1d]">{task.title}</p>
                  </div>
                </div>
                <button
                  onClick={() => toggle(task)}
                  className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-all ${
                    done ? "bg-[#3a9e94] border-[#3a9e94]" : "border-[#c4c7c7] hover:border-[#3a9e94]"
                  }`}
                >
                  {done && <Check size={12} className="text-white" strokeWidth={3} />}
                </button>
              </div>
            )
          })}
        </div>

        {showAddTask && (
          <AddTaskModal 
            onClose={() => setShowAddTask(false)} 
            onAdd={handleAddTask}
          />
        )}
      </div>
    )
}