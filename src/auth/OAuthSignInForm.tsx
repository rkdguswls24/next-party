"use client"

import { signInWithOAuthSite } from '@/lib/action'
import React from 'react'


function OAuthSignInForm({site}:{site:string}) {
  return (
    <form action={async () => { await signInWithOAuthSite(site)}}>
        <button 
            type='submit'
            className='rounded-lg text-white border px-4 py-2 bg-black'>
            {site}
        </button>
    </form>
  )
}

export default OAuthSignInForm;