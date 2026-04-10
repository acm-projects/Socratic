"use client"

export default function QuizOverview() {
  const courses = [
    { id: 1, name: "Discrete Math",  color: "#10b981", average: 84, quizCount: 7 },
    { id: 2, name: "Linear Algebra", color: "#6366f1", average: 78, quizCount: 9 },
    { id: 3, name: "Calculus II",    color: "#3b82f6", average: 71, quizCount: 8 },
    { id: 4, name: "Physics I",      color: "#8b5cf6", average: 68, quizCount: 7 },
      { id: 5, name: "Physics I",      color: "#8b5cf6", average: 68, quizCount: 7 },
        { id: 6, name: "Physics I",      color: "#8b5cf6", average: 68, quizCount: 7 },
         { id: 7, name: "Physics I",      color: "#8b5cf6", average: 68, quizCount: 7 },
    
  ]

  return (
    <div className="flex flex-col h-full">
      <p className="text-md font-semibold text-[#14153A] pb-1 shrink-0 px-2">Quiz Overview</p>
      <div className="flex-1 min-h-0 overflow-y-auto scrollbar-hide flex flex-col gap-6 p-2 ">
        {courses.map((course) => (
          <CourseRow key={course.id} course={course} />
        ))}
      </div>
    </div>
  )
}

function CourseRow({ course }) {
  const { name, color, average, quizCount } = course

  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex items-center justify-between">

        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-[#14153A]">{name}</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-bold" style={{ color }}>
            {average}% avg
          </span>
          <span
            className="text-xs font-bold px-3 py-1 rounded-full"
            style={{ color, backgroundColor: color + "18" }}
          >
            {quizCount} quizzes
          </span>

        </div>
      </div>

      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden my-1">
        <div
          className="h-full rounded-full"
          style={{
            width: `${average}%`,
            background: `linear-gradient(to right, ${color}99, ${color})`,
          }}
        />
      </div>
    </div>
  )
}