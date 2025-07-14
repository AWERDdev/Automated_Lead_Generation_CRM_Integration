import Link from "next/link"
import type { LINKPROPS } from "@/Types/LinkProps"

export const LinkStyle1: React.FC<LINKPROPS> = ({ROUTE,text}) =>{
    return(
        <>
        <div className="flex">
        <Link className="text-black hover:underline-offset-2 underline-offset-0 " href={ROUTE}>{text}</Link>
        </div>
        </>
    )
}