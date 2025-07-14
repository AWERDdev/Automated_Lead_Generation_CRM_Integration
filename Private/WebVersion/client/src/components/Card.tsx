import type { CardProps } from "@/Types/CardProps"

const Card: React.FC<CardProps> = ({title,ICON,INFO}) =>{
    return(
        <>
            <div className="">
                <div className="">
                    <span className="">{ICON}</span>
                    <span className="">{title}</span>
                </div>
                <div className="">
                    <p className="">{INFO}</p>
                </div>
            </div>
        </>
    )
}
export default Card