"use client"
import { useState, useEffect } from "react"
import { Check } from "lucide-react"
import { useSession } from "next-auth/react";

export default function UpcomingTasks() {
  const { data: session } = useSession();
  const userId = session?.user?.id;

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
        console.log('tasks:', data);
        setTasks(data);
      } catch (err) {
        console.error("Failed to fetch tasks:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUpcomingTasks();
  }, [userId]);

  const toggle = async (taskId, currentCompleted) => {
    // Optimistic update
    setTasks(prev => prev.map(t => 
      t.id === taskId ? { ...t, completed: !currentCompleted } : t
    ));

    try {
      const res = await fetch(`http://3.128.186.118:5000/api/users/${userId}/tasks/${taskId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !currentCompleted })
      });
      
      if (!res.ok) {
        // Revert on failure
        setTasks(prev => prev.map(t => 
          t.id === taskId ? { ...t, completed: currentCompleted } : t
        ));
        console.error("Failed to update task");
      }
    } catch (err) {
      console.error("Failed to update task:", err);
      // Revert on failure
      setTasks(prev => prev.map(t => 
        t.id === taskId ? { ...t, completed: currentCompleted } : t
      ));
    }
  };

  if (loading) {
    return <div className="p-4 text-sm text-[#90aba7]">Loading tasks...</div>;
  }

  return (
    <div className="flex flex-col flex-1 min-h-0">
      <h2 className="text-base font-semibold text-[#141f1d] mb-3 shrink-0">Upcoming Tasks</h2>
      <div className="overflow-y-auto scrollbar-hide flex flex-col">
        {tasks.map((task, i, arr) => {
          const done = task.completed;
          return (
            <div key={task.id} className={`flex items-center gap-4 py-4 ${i !== arr.length - 1 ? "border-b border-[#EAEEED]" : ""}`}>
              <div className={`flex items-center gap-4 flex-1 transition-opacity ${done ? "opacity-40" : "opacity-100"}`}>
                <div className="w-28 pr-6 flex-shrink-0">
                  <p className="text-sm text-[#90aba7] pb-1">Due</p>
                  <p className="text-sm font-bold text-[#141f1d]">
                    {new Date(task.due_date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </p>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold pb-1 text-[#141f1d]">{task.task_name}</p>
                  <p className="text-xs text-[#90aba7] mt-0.5">{task.class_name}</p>
                </div>
              </div>

              <button
                onClick={() => toggle(task.id, task.completed)}
                className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-all ${
                  done ? "bg-[#3a9e94] border-[#3a9e94]" : "border-[#c4c7c7] hover:border-[#3a9e94]"
                }`}
              >
                {done && <Check size={12} className="text-white" strokeWidth={3} />}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}