"use client"
import { useState, useEffect } from "react"
import { BookOpen, Users, ChevronDown } from "lucide-react"

export default function SharedClasses({ session, onShowScheduleModal }) {
  const [sharedClasses, setSharedClasses] = useState([])
  const [expandedClass, setExpandedClass] = useState(null)

  useEffect(() => {
    if (!session) return
    fetch(`/backend/users/${session.user.id}/friends/shared-classes`)
      .then(res => res.json())
      .then(data => {
        const formatted = data.map(f => ({
          id: f.friend_id,
          name: `${f.first_name} ${f.last_name}`,
          classes: f.shared_classes.map(c => c.name),
          image: f.image   

        }))
        setSharedClasses(formatted)
      })
      .catch(err => console.error(err))
  }, [session])

  return (
    <div className="bg-white/65 backdrop-blur-sm rounded-2xl p-5 flex flex-col min-h-0">
      <div className="flex items-center gap-2 mb-4 shrink-0">
        <BookOpen size={18} className="text-gray-900" />
        <h2 className="text-md font-semibold text-[#14153A]">Shared Classes</h2>
      </div>

      <div className="flex flex-col gap-2 overflow-y-auto">
        {sharedClasses.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Users size={40} className="text-gray-300 mb-3" />
            <p className="text-sm font-medium text-gray-600">No shared classes</p>
            <p className="text-xs text-gray-400">Connect with classmates!</p>
          </div>
        ) : (
          Object.entries(
            sharedClasses.reduce((acc, friend) => {
              friend.classes.forEach(cls => {
                if (!acc[cls]) acc[cls] = []
                acc[cls].push(friend)
              })
              return acc
            }, {})
          ).map(([cls, friendsInClass], i) => {
            const isOpen = expandedClass === i
            return (
              <div key={cls} className="rounded-xl border border-white/60 bg-white/40">
                <button
                  onClick={() => setExpandedClass(isOpen ? null : i)}
                  className="w-full px-3 py-2.5 flex items-center justify-between rounded-xl hover:bg-white/30 transition-colors"
                >
                  <div className="text-left">
                    <p className="text-sm font-semibold text-[#141f1d]">{cls}</p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {friendsInClass.length} {friendsInClass.length === 1 ? "friend" : "friends"} enrolled
                    </p>
                  </div>
                  <ChevronDown
                    size={15}
                    className={`text-gray-400 transition-transform duration-200 shrink-0 ml-2 ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {isOpen && (
                  <div className="px-3 pb-3 flex flex-col gap-1">
                    <div className="h-px bg-gray-200/70 mb-1" />
                    {friendsInClass.map((friend, idx) => (
                      <div key={idx} className="flex items-center justify-between py-1.5 px-1">
                        <div className="flex items-center gap-2">


                            <img
                                src={friend.image}
                                alt={friend.name}
                                className="w-6 h-6 rounded-full object-cover shrink-0 bg-gray-200"
                                onError={(e) => e.target.src = '/default-avatar.png'}
                            />


                          <span className="text-xs font-medium text-[#141f1d]">{friend.name}</span>
                        </div>
                        <button
                          onClick={onShowScheduleModal}
                          className="text-xs font-medium text-[#3a9e94] hover:text-[#2d766f] transition-colors"
                        >
                          Meet
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}