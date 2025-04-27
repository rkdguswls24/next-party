'use client'
import OAuthSignInForm from '@/auth/OAuthSignInForm'
import { signInWithDB } from '@/lib/action'
import { signInSchema } from '@/repositories/dbschemas'
import { signInInfo } from '@/repositories/types'

import { Button, TextField } from '@radix-ui/themes'
import Link from 'next/link'
import { z } from 'zod'


function LoginContent() {

  async function onSubmit(e:React.FormEvent<HTMLFormElement>){
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = {
      email:String(formData.get('email')),
      password:String(formData.get('password')),

    }
    
    const error =  await signInWithDB(data)
    
  }

  return (
    <div className='flex-center flex-col gap-4 p-4'>
        <h1 className='font-bold text-3xl'>
          Sign In
        </h1>
        <form onSubmit={onSubmit} className='flex flex-col w-60'>
            <p className='mt-3 font-bold'>Email:</p>
            <TextField.Root name="email" placeholder='example@example.com'/>
      
            <p className='mt-3 font-bold'>Password:</p>
            <TextField.Root name="password" type='password' placeholder=''/>
            
            <div className='mt-4 pb-1 border-b border-gray-700'>
              <div className='flex justify-end'>
                <Button asChild>
                    <button className='w-20'>Sign In</button>
                </Button>
              </div>
              <div className='flex flex-col text-xs mt-2'>
                <Link href="/" className='flex justify-end text-gray-400'>forgot password?</Link>
                <p className='flex justify-end text-gray-400'>new Account?<Link className="border-b text-gray-600" href="/signup">Signup</Link></p>

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