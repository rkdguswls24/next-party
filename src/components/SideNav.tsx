import { HomeIcon, List, Settings, UserRound } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const SideNav = () => {
  return (
    <div className='fixed top-0 left-0 h-screen hidden sm:block bg-white p-4 w-60 border-r border-black/20 shadow-gray-500'>
        <div className='flex flex-col mt-5 gap-4'>
          <Link href={'/home'} className='flex items-center gap-3'>
            <HomeIcon/> Home
          </Link>
          <Link href={'/category'} className='flex items-center gap-3'>
            <List /> List
          </Link>
          <Link href={'/setting'} className='flex items-center gap-3'>
            <Settings /> Setting
          </Link>
          <Link href={'/profile'} className='flex items-center gap-3'>
            <UserRound /> Profile
          </Link>
        </div>
    </div>
  )
}

export default SideNav