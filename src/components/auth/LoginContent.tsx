'use client'
import OAuthSignInForm from '@/auth/OAuthSignInForm'

import { Button, TextField } from '@radix-ui/themes'
import Link from 'next/link'


function LoginContent() {
  return (
    <div className='flex-center flex-col gap-4 p-4'>
        <h1 className='font-bold text-3xl'>
          Sign In
        </h1>
        <form action={() => {
          
        }} className='flex flex-col w-60'>
            <p className='mt-3 font-bold'>Email:</p>
            <TextField.Root name="email" placeholder='example@example.com'/>
      
            <p className='mt-3 font-bold'>Password:</p>
            <TextField.Root name="password" type='password' placeholder=''/>
            
            <div className='mt-4 pb-1 border-b border-gray-700'>
              <div className='flex justify-end'>
                <Button asChild>
                    <p className='w-20'>Sign In</p>
                </Button>
              </div>
              <div className='flex flex-col text-xs mt-2'>
                <Link href="/" className='flex justify-end text-gray-400'>forgot password?</Link>
                <p className='flex justify-end text-gray-400'>new Account?<Link className="border-b text-gray-600" href="/">Signup</Link></p>

              </div>
            </div>

        </form>
        <div className='flex-center gap-2 mt-2'>
          <OAuthSignInForm site={'google'}/>
          <OAuthSignInForm site={'github'}/>

        </div>

      </div>
    
  )
}

export default LoginContent