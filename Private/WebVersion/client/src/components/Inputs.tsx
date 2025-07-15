import type { InputProps } from "@/Types/InputProps"

export const Input: React.FC<InputProps> = ({Type,PlaceHolder,ID,Label}) =>{
    return(
        <>
            <div className="mb-4">
                <div className="mb-1">
                    <label htmlFor={ID} className="block text-base font-medium text-gray-800 dark:text-gray-200 mb-1">{Label}</label>
                </div>
                <div>
                    <input type={Type} placeholder={PlaceHolder} id={ID} className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-neutral-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-900 transition" />
                </div>
            </div>
        </>
    )
}