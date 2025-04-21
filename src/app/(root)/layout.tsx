import HeaderNav from "@/components/HeaderNav"
import SideNav from "@/components/SideNav"


function layout({children}:{children:React.ReactNode}) {
  return (
    <div className="flex min-h-screen">
        <SideNav />
        <div className="flex-1 sm:ml-60">
        <HeaderNav/>
        <main className="mt-15 h-screen border border-gray-300 rounded-tl-xl p-4">
            {children}

        </main>
        </div>

    </div>
    
  )
}

export default layout