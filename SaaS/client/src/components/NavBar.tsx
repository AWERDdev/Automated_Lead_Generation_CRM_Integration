import { LinkStyle1 } from './LinkStyles'
import Link from "next/link"
import {ROUTES} from '@/Types/Routes'
import Image from "next/image";

const Navbar: React.FC = () =>{
 return(
    <>
    <main className="shadow-md bg-white w-screen h-full">
        <div className="flex justify-between">
            <div className="title flex items-center">
              <Link href={ROUTES.INTRO} className="flex items-center">
                <Image src="/globe.svg" alt="Logo" width={24} height={24} className="h-6 w-6 mr-2" />
                <span className="text-black font-bold">LeadGen CRM</span>
              </Link>
            </div>
            <div className="elments">
            <LinkStyle1 ROUTE={ROUTES.HOWITWORKS} text="How It works"/>
            </div>
        </div>
    </main>
    </>
 )
}

export default Navbar