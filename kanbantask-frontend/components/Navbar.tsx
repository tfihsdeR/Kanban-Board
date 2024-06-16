'use client'

import Link from 'next/link'
import React from 'react'
import { PiKanban } from 'react-icons/pi'
import { usePathname } from 'next/navigation'

const Navbar = () => {
    const pathname = usePathname()

    const isMainPage = () => {
        const result = pathname.split('/')[1] === '' ? true : false
        return result
    }

    return (
        <div className="py-5 bg-transparent relative z-10 w-full">
            <div className="flex justify-between w-[90%] max-w-[1450px] mx-auto">
                <Link href={isMainPage() ? '/' : '/boards'} className="flex gap-1 items-center text-2xl font-bold uppercase">
                    <h1>Rast Kanban</h1>
                    <PiKanban />
                </Link>
                <Link className={isMainPage() ? '' : 'hidden'} href={"/boards"}>Use without login &#8594;</Link>
            </div>
        </div>
    )
}

export default Navbar
