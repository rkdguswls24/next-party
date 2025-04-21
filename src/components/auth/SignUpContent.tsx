"use client"

import { signUp } from '@/lib/action';
import { SignUpInfo } from '@/repositories/types';

import { Button, TextField } from '@radix-ui/themes'
import { useRouter } from 'next/navigation'
import { useState } from 'react';




function SignUpContent() {
  const route = useRouter();
  const [error, setError] = useState('')
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
   
    const parseData : SignUpInfo = {
      email: String(formData.get('email')),
      name: String(formData.get('name')),
      password: String(formData.get('password')),
      role: String(''),
    }
    
    const error = await signUp(parseData)
    console.log(error)
  }
  

  return (
    <div className='flex-center flex-col gap-4 p-4'>
        <h1 className='font-bold text-3xl'>
          Sign Up
        </h1>
        <form onSubmit={handleSubmit} className='flex flex-col w-60'>
            <p className='mt-3 font-bold'>Email:</p>
            <TextField.Root name="email" placeholder='example@example.com'/>
      
            <p className='mt-3 font-bold'>UserName:</p>
            <TextField.Root name="name" placeholder='John Doe'/>
            <p className='mt-3 font-bold'>Password:</p>
            <TextField.Root name="password" type='password' placeholder=''/>
            

            <div className='mt-4 pb-1'>
              <div className='flex justify-end'>
                <Button type="submit" color='gray' variant='outline' highContrast>
                    Sign Up
                </Button>
              </div>
              
            </div>

        </form>
        

      </div>
  )
}

export default SignUpContent