import React from 'react'
import { Button } from './ui/button'
import { CirclePlus } from 'lucide-react'
import { Post } from '@/repositories/types'
import { cn } from '@/lib/utils'

function Card({post}:{post:Post}) {
    const statusPing = post.status ? "bg-green-500" : "bg-red-500"
  return (
    <div className="flex flex-col p-4 bg-gray-200 min-w-xs w-xs rounded-md gap-4">
        <div className="flex flex-col gap-2">
            <div className="flex-between gap-2">
                <div className="text-xl line-clamp-1">
                    <h1>{post.title}</h1>
                </div>
                <div className="relative flex-center h-2 w-2 ">
                    <div className={cn("absolute inset-0 blur-xs",statusPing)}></div>
                    <div className={cn("rounded-full h-2 w-2  z-10",statusPing)}></div>
                </div>
            </div>
            <div className="text-black/50 line-clamp-3 ">
                <p>{post.desc}</p>
            </div>
        </div>
        <div className="flex flex-col gap-2">
            <div className="flex justify-end text-sm text-red-400 ">
                <p>마감: {post.deadlineAt}</p>
            </div>
            <div className="flex-between">
                <div>
                    {post.members.length}/{post.maxCount}
                </div>
                <Button disabled={!post.status} className=''>
                    <CirclePlus />Add
                </Button>
            </div>
        </div>

    </div>
  )
}

export default Card