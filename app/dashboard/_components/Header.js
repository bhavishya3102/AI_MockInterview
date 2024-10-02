import React from 'react'

import img from "../../../assets/—Pngtree—dove logo template vector_15322095.png"
import Image from 'next/image'
import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'
const Header = () => {
  return (
    <div className="bg-gray-50 shadow-md py-4">
        <div className="flex items-center justify-between mx-6 ">
     <Link href="/">
     <Image src={img} width={50} height={50} alt='error'></Image>
     </Link>
     <div className="hidden md:flex flex-row items-center gap-3">
<Link href="/dashboard">

<h2 className="cursor-pointer hover:text-blue-900 font-bold  " >Dashboard</h2>
</Link>
        <h2 className="cursor-pointer hover:text-blue-900 font-bold ">Questions</h2>
        <h2 className="cursor-pointer hover:text-blue-900 font-bold">Upgrade</h2>
        <h2 className="cursor-pointer hover:text-blue-900 font-bold ">How it Works</h2>

     </div>

     <UserButton/>
    </div>
    </div>
  )
}

export default Header
