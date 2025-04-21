"use client"

import { logOut } from "@/lib/action"


function SignOutForm() {
  return (
    <button
     onClick={async () => await logOut()}
     className='px-4 py-2 bg-red-400 rounded-lg'>
        Logout
    </button>
  )
}

export default SignOutForm