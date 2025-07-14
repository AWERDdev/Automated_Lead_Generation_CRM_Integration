import Link from "next/link"
import {ROUTES} from '@/Types/Routes'

const BNavbar: React.FC = () =>{
 return(
    <>
    <main className="shadow-md bg-white w-screen h-full">
        <div className="flex justify-between">
            <div className="title"><Link href={ROUTES.INTRO}>
        <span className="text-black font-bold">© 2024 LeadGen CRM. All rights reserved.</span></Link></div>
            <div className="elments">
                <Link className="text-black hover:underline-offset-2 underline-offset-0 " href={ROUTES.INTRO}>Terms of Service</Link>
                <Link className="text-black hover:underline-offset-2 underline-offset-0 " href={ROUTES.INTRO}>Privacy</Link>
            </div>
        </div>
    </main>
    </>
 )
}

export default BNavbar