
import SignupForm from "../components/signUpForm"

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center"
    style={{
      backgroundImage: "linear-gradient(to right, rgba(240,245,244,0.4) 0%, rgba(245,248,247,0.8) 40%, rgba(250,250,250,0.9) 100%), url('/gridbackground.svg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat"
    }}>
      <SignupForm />
    </div>
  )
}