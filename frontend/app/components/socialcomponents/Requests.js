"use client"
import { useState, useEffect } from "react";
import Sendrequestmodal from "./Sendrequestmodal";





export default function Requests(){
  const [requests, setRequests] = useState([]);
  const [showAddFriend, setShowAddFriend] = useState(false);



    useEffect(() => {
    fetch(`/backend/users/u1/friend-requests`)
      .then(res => res.json())
      .then(async (data) => {
        const pending = data.filter(req => req.status === "pending")
        const requestDetails = await Promise.all(
          pending.map(async (req) => {
            const sender = await fetch(`/backend/users/${req.sender_id}`).then(r => r.json())
            return {
              id: req.id,
              name: sender.name || sender.email,
              email: sender.email,
            }
          })
        )
        setRequests(requestDetails)
      })
  }, [])



{/*removes them from requests array*/}
function acceptRequest(id) {
  setRequests(requests.filter(r => r.id !== id));
}

function declineRequest(id) {
  setRequests(requests.filter(r => r.id !== id));
}


    return(
            <div className="bg-white w-[430px]] h-77 rounded-xl p-7 mt-5">
            <div className = "flex flex-col gap-5">
            <h2 className="text-l font-semibold text-black">Friend Requests</h2>
            <div className = "flex flex-col gap-3">

             {/*displays array of requests*/}

            {requests.map((request) => (
                <div key ={request.id} className = "flex items-center justify-between bg-[#F9FAFB] rounded-xl px-4 py-3">
                <div className = "flex flex-col">
                    <p className="text-sm font-semibold text-black">{request.name} </p>
                    <p className="text-xs text-gray-400">{request.email} </p>
                </div>

              {/*accept and decline buttons*/}

            <div className = "flex gap-2">
                <button 
                onClick={() => acceptRequest(request.id)}
                  className="cursor-pointer bg-[#EEEFFE] text-black text-xs font-medium px-4 py-1.5 rounded-full">
                  Accept
                </button>
                <button
                  onClick={() => declineRequest(request.id)}
                  className=" cursor-pointer border border-gray-300 text-gray-500 text-xs font-medium px-4 py-1.5 rounded-full hover:bg-gray-50">
                  Decline
                </button>
              </div>
            </div>
          ))}
        </div>



{/*displays the modal to add friend*/}

        <div className="flex justify-end">
          <button 
          onClick ={() => setShowAddFriend(true)}
          className="cursor-pointer flex items-center gap-2 bg-[#3959E9] hover:bg-[#2039AF] text-white text-sm font-medium px-4 py-2 rounded-xl">
            Add Friend
          </button>
        </div>
      </div>
      {showAddFriend && <Sendrequestmodal onClose={() => setShowAddFriend(false)} />}
    </div>
  );
}
