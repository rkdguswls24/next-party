import { auth } from '@/auth/auth';
import SignOutForm from '@/auth/SignOutForm';
import Link from 'next/link';


const HeaderNav = async () => {
  const session = await auth();
  {console.log(session)}
  return (
    <div className='fixed top-0 left-0 sm:left-60 right-0 flex-between p-4 h-15 bg-white border border-gray-300 rounded-l-2xl'>
        <div>
            Logo
        </div>
        <div>
          {
            !!session ? (
              <SignOutForm/>
            ):(
              <Link href="/login">Login</Link>    
            )
          }
          
        </div>
    </div>
  )
}

export default HeaderNav