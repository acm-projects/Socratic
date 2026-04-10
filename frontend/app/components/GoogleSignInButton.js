"use client"
import { signIn } from 'next-auth/react'

export default function GoogleSignInButton() {
  return (
    <button
      onClick={() => signIn('google', { callbackUrl: '/signup' })}
      className="w-fit px-8 py-4 rounded-full bg-white border-2 border-[#3a9e94] text-[#3a9e94] font-bold text-base mt-4 flex items-center gap-3 shadow-[4px_4px_0px_0px_#3a9e94] hover:shadow-[2px_2px_0px_0px_#3a9e94] hover:translate-x-[2px] hover:translate-y-[2px] transition-all active:shadow-none active:translate-x-[4px] active:translate-y-[4px]">
      <img src="/icons/googlelogo.svg" alt="Google" className="w-5 h-5" />
      <span>Continue with Google</span>
    </button>
  )
}