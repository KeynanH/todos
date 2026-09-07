'use client'

import '@/i18n'
import { signOut } from "next-auth/react";
import { use, useEffect } from "react"
import { useTranslation } from 'react-i18next';

interface HeaderProps {
    lng: string
}

export default function Header({lng} : HeaderProps){
    
    const {t, i18n} = useTranslation()

    useEffect(() => {
        if(lng && i18n.language !== lng){
        i18n.changeLanguage(lng)
        }
    },[lng, i18n])

    return(
            <div className="flex flex-row py-6 px-4 w-full items-center justify-between bg-white text-black">
                <div>
                    <h1 className="text-3xl">{t('todosapp')}</h1>
                </div>
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