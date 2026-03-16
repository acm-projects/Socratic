"use client"
import { useState } from "react";
import Sendrequestmodal from "./Sendrequestmodal";





export default function Requests(){
      const [requests, setRequests] = useState([
    { id: 1, name: "Bryan Smith", email: "bryansmith21@gmail.com" },
    { id: 2, name: "Alex Turner", email: "alexturner121@gmail.com" },

  ]);

  const [showAddFriend, setShowAddFriend] = useState(false);



{/*removes them from requests array*/}
function acceptRequest(id) {
  setRequests(requests.filter(r => r.id !== id));
}

function declineRequest(id) {
  setRequests(requests.filter(r => r.id !== id));
}


    return(
            <div className="bg-white w-133 h-70 rounded-xl p-5 mt-5 border border-gray-200">
            <div className = "flex flex-col gap-5">
            <h2 className="text-l font-semibold text-black">Friend Requests</h2>
            <div className = "flex flex-col gap-3">
            {requests.map((request) => (
                <div key ={request.id} className = "flex items-center justify-between border border-gray-200 rounded-xl px-4 py-3">
                <div className = "flex flex-col">
                    <p className="text-sm font-semibold text-black">{request.name} </p>
                    <p className="text-xs text-gray-400">{request.email} </p>
                </div>
            <div className = "flex gap-2">
                <button 
                onClick={() => acceptRequest(request.id)}
                  className="cursor-pointer bg-[#4A6FA5] hover:bg-[#3a5a8a] text-white text-xs font-medium px-4 py-1.5 rounded-full">
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




        <div className="flex justify-end">
          <button 
          onClick ={() => setShowAddFriend(true)}
          className="cursor-pointer flex items-center gap-2 bg-[#4A6FA5] hover:bg-[#3a5a8a] text-white text-sm font-medium px-4 py-2 rounded-xl">
            Add Friend
          </button>
        </div>
      </div>
      {showAddFriend && <Sendrequestmodal onClose={() => setShowAddFriend(false)} />}
    </div>
  );
}
