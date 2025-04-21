'use client'

import { useEffect, useState } from "react"

const MainBanner = () => {
  const [date, setDate] = useState(new Date())
  useEffect(() => {
    const time = setInterval(() => setDate(new Date()),1000);
    return () => {
      clearInterval(time);
      
    }
  },[])
  return (
    <div className='flex flex-col justify-between w-full max-w-3xl md:h-[300px] sm:h-40 bg-black rounded-2xl p-4 text-white'>
        <div className="m-4">
          <h1 className='lg:text-4xl md:text-2xl'>
            MyCustom Messagsde dfsdfsfsdfs sdfds sdfdsf sdfsd sd ds
          </h1>
        </div>
        <div className="flex text-4xl justify-end">
          {date.toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"})}
        </div>
    </div>
  )
}

export default MainBanner