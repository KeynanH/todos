'use client'

import { useRouter, usePathname } from "next/navigation"
import { languages } from "@/i18n"

interface LocaleToggleProps{
    currentLng: string
}

export default function LocaleToggle({ currentLng}: LocaleToggleProps){
    
    const router = useRouter()
    const pathname = usePathname()

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newLng = e.target.value

        const segments = pathname.split('/')

        segments[1] = newLng

        const newPath = segments.join('/')
        router.push(newPath)
    }

    return(
        <div className="">
            <select
                value={currentLng}
                onChange={handleChange}
                className=""
            >
                {languages.map((lng) =>(
                    <option key={lng} value={lng}>
                        {lng === 'en' ? 'English' : 'Deutsch'}
                    </option>
                ) )}
            </select>
        </div>
    )
}