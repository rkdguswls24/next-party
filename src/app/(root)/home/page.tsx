import Card from '@/components/Card'
import MainBanner from '@/components/home/MainBanner'
import SubBanner from '@/components/home/SubBanner'
import { dummyPosts } from '@/lib/dummy'
import React from 'react'

const Home = () => {
  return (
    <div className='flex flex-col gap-10 w-auto'>
      {/* mainBanner */}
      <MainBanner/>
      <SubBanner/>
      
      
      
    </div>
  )
}

export default Home