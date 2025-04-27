

import { getCurrentUser } from "@/lib/currentUser"






async function page() {
  const fullUser = await getCurrentUser({withFullUser:true,redirectIfNotFound:true})
  
  
  return (
    <div className="flex-center flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h1 className="font-bold">USER_ID:{fullUser?.id}</h1>
        <span className="text-xs text-gray-400">ROLE:{fullUser?.role.toUpperCase()}</span>

      </div>
    </div>
  )
}

export default page