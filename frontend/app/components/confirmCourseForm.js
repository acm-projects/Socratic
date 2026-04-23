"use client"
import Link from 'next/link';
import { useState , useEffect} from "react"
import { useSession } from "next-auth/react"

export default function ConfirmCoursesForm() {
  // const [courses, setCourses] = useState([
  //     {id: 1, name: "Computer Science I", code: "CS1436", hasSyllabus: true},
  //     {id: 2, name: "Discrete Math", code: "CS2305", hasSyllabus: true},
  //     {id: 3, name: "Physics I", code: "PHYS1301", hasSyllabus: false},
  //     {id: 4, name: "Calculus II", code: "MATH2419", hasSyllabus: true},
  // ])
  const { data: session } = useSession()
  const [courses, setCourses] = useState([])

    useEffect(() => {
      if (!session?.user?.email) return

      // get user id 
      fetch("/backend/users")
        .then(r => r.json())
        .then(users => {
          const me = users.find(u => u.email === session.user.email)
          // fetch only their classes
          return fetch(`/backend/classes?user_id=${me.id}`)
        })
        .then(r => r.json())
        .then(data => setCourses(data))
    }, [session])

    async function handleDelete(class_code) {
      const res = await fetch(`/backend/classes/${class_code}`, {
        method: "DELETE"
      })

      if (res.ok) {
        setCourses(courses.filter(c => c.class_code !== class_code))
      } else {
        console.error("Failed to delete class")
      }
    }

  return (
      <div className="bg-white rounded-2xl p-6 w-full max-w-2xl">
        <h1 className="text-2xl font-bold text-center  text-slate-900">Confirm Your Courses</h1>

        {/* contains all classes */}
        <div className="mt-6 border border-gray-200 rounded-xl">
          {courses.map((course) => {
            let syllabusText
            let syllabusStyle

            if (course.syllabus_url) {
                syllabusText = "SYLLABUS UPLOADED"
                syllabusStyle = "text-[10px] font-semibold text-[#3D5C9B] bg-[#d9e5fd] border border-blue-100 px-2 py-0.5 rounded-xl"
            } else {
                syllabusText = "NO SYLLABUS"
                syllabusStyle = "text-[10px] font-semibold text-[#728AB7] bg-white border border-[#728AB7] px-2 py-0.5 rounded-xl"
            }

            return (
            // shows information for one class
            <div key={course.class_code} className="px-5 py-4 border-b border-gray-200 flex items-center justify-between">
              <div>
                <p className="font-semibold text-gray-900">{course.name}</p>
                <div className="flex items-center gap-2 mt-1">
                    <p className="text-sm text-gray-400">{course.class_code}</p>
                    <span className={syllabusStyle}>{syllabusText}</span>
                </div>
              </div>

              <div className="flex gap-2">
                {/* edit button */}
                {/* <button className="p-1 border-2 border-gray-400 rounded-md">
                    <svg width="19" height="20" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.8526 0.866184C17.3235 0.31153 16.6064 0 15.8588 0C15.1111 0 14.394 0.31153 13.865 0.866184L0 15.4237V19.6106H3.98766L17.8526 5.05303C18.3807 4.49742 18.6773 3.74454 18.6773 2.95961C18.6773 2.17467 18.3807 1.4218 17.8526 0.866184ZM3.34639 17.9764H1.55646V16.097L11.9147 5.22953L13.7046 7.10887L3.34639 17.9764ZM16.7522 3.89765L14.8012 5.94613L13.0151 4.06679L14.9654 2.02157C15.2027 1.77235 15.5247 1.63235 15.8603 1.63235C16.196 1.63235 16.518 1.77235 16.7553 2.02157C16.9927 2.27079 17.126 2.6088 17.126 2.96124C17.126 3.31369 16.9927 3.6517 16.7553 3.90091L16.7522 3.89765Z" fill="#7C879B"/>
                    </svg>
                </button> */}

                {/* delete button */}
                <button onClick={() => handleDelete(course.class_code)} className="p-1 border-2 border-gray-400 rounded-md">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_474_1218)">
                        <path d="M17.9769 3.26842H13.8914V1.63421C13.8914 1.20079 13.7192 0.785124 13.4127 0.47865C13.1062 0.172175 12.6906 0 12.2571 0L7.35451 0C6.92109 0 6.50542 0.172175 6.19895 0.47865C5.89247 0.785124 5.7203 1.20079 5.7203 1.63421V3.26842H1.63477V4.90264H3.26898V17.1592C3.26898 17.8094 3.52724 18.4329 3.98695 18.8926C4.44666 19.3523 5.07017 19.6105 5.7203 19.6105H13.8914C14.5415 19.6105 15.165 19.3523 15.6247 18.8926C16.0844 18.4329 16.3427 17.8094 16.3427 17.1592V4.90264H17.9769V3.26842ZM7.35451 1.63421H12.2571V3.26842H7.35451V1.63421ZM14.7085 17.1592C14.7085 17.3759 14.6224 17.5838 14.4691 17.737C14.3159 17.8902 14.1081 17.9763 13.8914 17.9763H5.7203C5.50359 17.9763 5.29575 17.8902 5.14251 17.737C4.98928 17.5838 4.90319 17.3759 4.90319 17.1592V4.90264H14.7085V17.1592Z" fill="#7C879B"/>
                        <path d="M8.98772 8.17041H7.35352V14.7072H8.98772V8.17041Z" fill="#7C879B"/>
                        <path d="M12.2573 8.17041H10.623V14.7072H12.2573V8.17041Z" fill="#7C879B"/>
                        </g>
                        <defs>
                        <clipPath id="clip0_474_1218">
                        <rect width="19.6105" height="19.6105" fill="white"/>
                        </clipPath>
                        </defs>
                    </svg>

                </button>
              </div>
            </div>
            )
            })}

            {/* after courses */}
            <div className="px-5 py-4 flex items-center justify-between">
                <p className="font-semibold text-slate-900">Add another course</p>
                <Link href="createcourses" className="p-1 border-2 border-gray-500 rounded-full">
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                         <path d="M8.44745 6.03389V0H6.03389V6.03389H0V8.44745H6.03389V14.4813H8.44745V8.44745H14.4813V6.03389H8.44745Z" fill="#7C879B"/>
                    </svg>
                </Link>
            </div>
        </div>
        
          {/* link to dashboard */}
          <Link href="/dashboard" className="bg-black text-white px-8 py-3 rounded-xl font-semibold flex items-center justify-center mt-4">
            Create Dashboard
         </Link>

      </div>
  )
}