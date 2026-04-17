
import GoogleSignInButton from "./components/GoogleSignInButton"

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-between px-24"
        style={{
          backgroundImage: "linear-gradient(to right, rgba(240,245,244,0.4) 0%, rgba(245,248,247,0.8) 40%, rgba(250,250,250,0.9) 100%), url('/gridbackground.svg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }}>
    
          {/* Left side */}
          <div className="flex flex-col gap-6 w-1/2 pl-10">
            <h1 className="text-6xl font-bold text-[#141f1d] leading-tight">
              Study smarter<br />with Socratic.
            </h1>
            <p className="text-lg text-gray-500 max-w-md">
              Test your knowledge, track your growth, and master every concept with personalized AI chats and collaborative tools that make learning visible, engaging, and fun.
            </p>
    
             <GoogleSignInButton />
          </div>
    
          {/* Right side */}
          <div className="relative w-1/2 h-screen flex items-center justify-center">
            <img src="icons/landing-graphic.svg" className="w-full scale-110" />
          </div>
    
    </div>
  )
}


