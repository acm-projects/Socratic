"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {User, Users, LayoutGrid, LogOut} from "lucide-react";
import { signOut } from "next-auth/react"


export default function Navbar() {
      const pathname = usePathname();

    return (
                

        <nav className="fixed top-0 left-0 w-16 h-screen flex flex-col items-center justify-center gap-3 px-5 bg-white">
            <Link href = "/dashboard">
                <button className={`p-2 px-6 rounded-lg ${pathname === "/dashboard" ? "bg-[#F5F6FA]" : "hover:bg-gray-100"}`}>
                <LayoutGrid className="text-black" size={25} />
                </button>
                </Link>

            <Link href = "/social">
                 <button className={`p-2 px-6 rounded-lg ${pathname === "/social" ? "bg-[#F5F6FA]" : "hover:bg-gray-100"}`}>
                <Users className="text-black" size={25} />
                </button>
                </Link>

            <Link href = "/profile">
        <       button className={`p-2 px-6 rounded-lg ${pathname === "/profile" ? "bg-[#F5F6FA]" : "hover:bg-gray-100"}`}>
                <User className="text-black" size={25} />
                </button>
                </Link>

                <button onClick={() => signOut({ callbackUrl: '/' })} className="p-2 px-6 rounded-lg hover:bg-gray-100">
                    <LogOut className="text-black" size={25} />
                </button>

        </nav>
    );
}
