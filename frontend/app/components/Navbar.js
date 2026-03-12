"use client";
import Link from "next/link";
import {User, Users, LayoutGrid, LogOut} from "lucide-react";


export default function Navbar() {
    return (
                

        <nav className="absolute top-75 left-11 w-16 h-64 shadow-md flex flex-col items-center justify-center gap-3 px-5 bg-[#D9E5FD] rounded-2xl">
            <Link href = "/">
            <button className="p-2 rounded-full hover:bg-gray-100">
                <LayoutGrid className="text-black" size={25} />
                </button>
                </Link>

            <Link href = "/social">
            <button className="p-2 rounded-full hover:bg-gray-100">
                <Users className="text-black" size={25} />
                </button>
                </Link>

            <Link href = "/profile">
            <button className="p-2 rounded-full hover:bg-gray-100">
                <User className="text-black" size={25} />
                </button>
                </Link>

                <button className="p-2 rounded-full hover:bg-gray-100">
                    <LogOut className="text-black" size={25} />
                </button>

        </nav>
    );
}
