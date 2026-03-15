"use client"
import { useEffect } from "react"
import { signIn } from 'next-auth/react'

export default function LandingCard() {
  useEffect(() => {
  localStorage.clear()
  }, [])

  return (
      <div className="bg-white px-12 py-20 rounded-[16px] flex flex-col items-center border border-gray-100">
        <h1 className="text-6xl font-medium text-slate-900 mb-1">
          Welcome to <span className="text-[#93C3FF] drop-shadow-lg">SOCRATIC</span>
        </h1>

        <h1 className="text-4xl font-medium text-slate-900 mb-4">
          Your AI powered study companion
        </h1>

        <p className="text-xl text-slate-900 mb-8 text-center max-w-lg">
          Ask better questions. Get better results.
        </p>


        <button onClick={() => signIn('google', { callbackUrl: '/profilepage' })} className="bg-white border border-gray-500 px-8 py-2 rounded-xl">
          <div className="flex gap-3 items-center justify-center">
          <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.639 9.58946C17.639 8.91272 17.5829 8.41887 17.4617 7.90674H9.57617V10.9612H14.2048C14.1115 11.7203 13.6076 12.8635 12.4877 13.6317L12.472 13.7339L14.9653 15.6268L15.138 15.6437C16.7244 14.2079 17.639 12.0953 17.639 9.58946Z" fill="#4285F4"/>
            <path d="M9.57516 17.6377C11.8428 17.6377 13.7465 16.906 15.137 15.644L12.4867 13.6319C11.7775 14.1166 10.8256 14.455 9.57516 14.455C7.35417 14.455 5.46914 13.0192 4.79717 11.0347L4.69868 11.0429L2.10617 13.0091L2.07227 13.1015C3.45338 15.7902 6.29029 17.6377 9.57516 17.6377Z" fill="#34A853"/>
            <path d="M4.7985 11.0345C4.62119 10.5224 4.51858 9.97364 4.51858 9.40666C4.51858 8.83961 4.62119 8.29091 4.78917 7.77878L4.78447 7.66971L2.15947 5.67188L2.07358 5.71191C1.50436 6.82765 1.17773 8.08059 1.17773 9.40666C1.17773 10.7327 1.50436 11.9856 2.07358 13.1013L4.7985 11.0345Z" fill="#FBBC05"/>
            <path d="M9.5752 4.35833C11.1523 4.35833 12.2161 5.02594 12.8227 5.58384L15.193 3.31579C13.7373 1.98972 11.8428 1.17578 9.5752 1.17578C6.29031 1.17578 3.45338 3.02312 2.07227 5.71183L4.78786 7.7787C5.46916 5.79417 7.3542 4.35833 9.5752 4.35833Z" fill="#EB4335"/>
          </svg>
          <p className="text-black font-medium">Continue with Google</p>
          </div>
        </button>
      </div>
  );
}

