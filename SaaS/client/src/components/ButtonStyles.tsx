import type { ButtonPROPS } from "@/Types/ButtonPROPS"

export const Buttonstyle1: React.FC<ButtonPROPS> = ({ButtonFUNC,buttonText}) =>{
    return(
        <>
        <div>
        <button className=""onClick={ButtonFUNC}>{buttonText}</button>
        </div>
        </>
    )
}


export const Buttonstyle2: React.FC<ButtonPROPS> = ({ButtonFUNC,buttonText}) =>{
    return(
        <>
        <div>
        <button className=""onClick={ButtonFUNC}>{buttonText}</button>
        </div>
        </>
    )
}