"use client"
import { signInWithSite } from '@/lib/action'
import React from 'react'


function SignInForm({site}:{site:string}) {
  return (
    <form action={async () => { await signInWithSite(site)}}>
        <button 
            type='submit'
            className='rounded-lg text-white border px-4 py-2 bg-black'>
            {site}
        </button>
    </form>
  )
}

export default SignInForm