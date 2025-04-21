
import Card2 from '@/components/Card2'
import { dummyPosts } from '@/lib/dummy'
import Link from 'next/link'
import React from 'react'

function CategoryPage() {
  return (
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
  )
}

export default CategoryPage