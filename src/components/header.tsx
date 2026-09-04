'use client'
import { signOut } from "next-auth/react";

export default function Header(){
    return(
            <div className="flex flex-col py-6 px-4 w-full items-end justify-center bg-white">
                <div>
                    <button
                    onClick={() => signOut({ callbackUrl: "/login" })}
                    className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 transition-colors"
                    >
                    Sign Out
                    </button>
                </div>
            </div>
    )
}