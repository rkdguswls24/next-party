import Card2 from '@/components/Card2'
import { dummyPosts } from '@/lib/dummy'
import Link from 'next/link'
import React from 'react'

const page = () => {
  
  return (
    <div className='flex flex-col gap-6'>
      <div>
        <h1 className='text-4xl font-bold'>Title</h1>
      </div>
      <div className='flex flex-col gap-2'>
        {dummyPosts.map((post) => {
            return (
                <div key={post.id} className="">
                    <Link href={`/post/${post.id}`}>
                        <Card2 post={post}/>
                    </Link>
                </div>
            )
        })}

      </div>

      
        
    </div>
  )
}

export default page