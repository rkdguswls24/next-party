import React from 'react'

function AuthPageForm({children}:{children:React.ReactNode}) {
  return (
    <div className='flex-center mt-5'>
      <div className='border border-black rounded-lg p-2 mt-4 w-100'>
          {children}
      </div>
    </div> 
  
  )
}

export default AuthPageForm