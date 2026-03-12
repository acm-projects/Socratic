"use client"
import Link from 'next/link';
import { useState } from "react"

export default function Signup() {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [school, setSchool] = useState("")
  const [major, setMajor] = useState("")
  const [classStatus, setClassStatus] = useState("")

  function saveUser() {
    const user = { firstName, lastName, school, major, classStatus }
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

          <Link href="/createcourses" onClick={saveUser} className="bg-[#2C2C2C] text-white px-8 py-3 rounded-xl font-medium flex items-center justify-center mt-4">
            Submit
         </Link>
        </form>
      </div>
  );
}