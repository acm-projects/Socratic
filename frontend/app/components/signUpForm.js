"use client"
import Link from 'next/link';
import { useState } from "react"
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react';


export default function Signup() {
  const { data: session, status } = useSession()
  const router = useRouter()

  //hold form values
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [school, setSchool] = useState("")
  const [major, setMajor] = useState("")
  const [classStatus, setClassStatus] = useState("")

  //checks if all fields were entered
  const isValid = firstName.trim() && lastName.trim() && school.trim() && major && classStatus


  useEffect(() => {
    if (status === 'loading') return
    if (!session) return
    if (!session.isNewUser) router.replace('/profile')  // existing user goes to profile page instead of signup
  }, [session, status])

  if (status === 'loading' || (session && !session.isNewUser)) return null // to avoid seeing signup form before redirect


  function handleSubmit() {
    if (!isValid) return //checks if all fields were entered
    const user = { firstName, lastName, school, major, classStatus } //saves the user
    router.push("/createcourses") //go to next page if valid
  }

  return (
      <div className="bg-white px-10 py-15 rounded-[20px] w-1/3 border border-gray-100 flex flex-col items-center">
        <h1 className="text-3xl font-semibold text-slate-900 mb-10">Get started with Socratic</h1>
        
        <form className="flex flex-col gap-3">
          <div className="flex gap-5">
            <div className="flex-1">
              <label className="text-sm font-normal text-gray-900 ml-1">First Name</label>
              <input 
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full bg-gray-50 rounded-lg p-3 text-sm text-slate-400"
                placeholder="Enter name"         
              />
            </div>
            <div className="flex-1">
              <label className="text-sm font-normal text-gray-900 ml-1">Last Name</label>
              <input 
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full bg-gray-50 rounded-lg p-3 text-sm text-slate-400"
                placeholder="Enter name"
                
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-normal text-gray-900 ml-1">School or Institution</label>
            <input 
              value={school}
              onChange={(e) => setSchool(e.target.value)}
              className="w-full bg-gray-50 rounded-lg p-3 text-sm  text-slate-400"
              placeholder="Enter School"
            />
          </div>

          <div>
            <label className="text-sm font-normal text-gray-900 ml-1">Major</label>
            <select 
              value={major}
              onChange={(e) => setMajor(e.target.value)}
              className="w-full bg-gray-50 rounded-lg p-3 text-sm text-gray-400">
              <option value="">Select</option>
              <option value="computerscience">Computer Science</option>
              <option value="biology">Biology</option>
              <option value="chemistry">Chemistry</option>
              <option value="physics">Physics</option>
              <option value="mathematics">Mathematics</option>
              <option value="engineering">Engineering</option>
              <option value="environmental_science">Environmental Science</option>
              <option value="data_science">Data Science</option>
              <option value="nursing">Nursing</option>
              <option value="psychology">Psychology</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-normal text-gray-900 ml-1">Class status</label>
            <select 
              value={classStatus}
              onChange={(e) => setClassStatus(e.target.value)}
              className="w-full bg-gray-50 rounded-lg p-3 text-sm text-gray-400">
              <option value="">Select</option>
              <option value="freshman">Freshman</option>
              <option value="sophomore">Sophomore</option>
              <option value="junior">Junior</option>
              <option value="senior">Senior</option>
              <option value="senior">Graduate</option>
              
            </select>
          </div>

          <button
            type="button" // to avoid auto refresh
            onClick={handleSubmit} 
            disabled={!isValid}
            className={`
            px-8 py-3 rounded-xl font-medium flex items-center justify-center mt-4
            transition-all duration-200
            ${isValid
              ? "bg-[#2C2C2C] text-white hover:bg-[#444444] hover:scale-[1.02] cursor-pointer"
              : "bg-gray-200 text-gray-400"
            }
          `}>
            Submit
         </button>
        </form>
      </div>
  );
}